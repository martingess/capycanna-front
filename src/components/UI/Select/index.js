import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.scss';
import { IconArrowDown } from '@UI';

export const Select = ({ value, onChange, options, placeholder, searchable = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState(value);

  const selectRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions =
    options && options?.filter((option) => option.toLowerCase().includes(search.toLowerCase()));

  const clearInputOnDelete = (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      console.log('Delete key pressed', event.key);
      setInputValue('');
      setSearch('');
      setIsOpen(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <div className={styles.selectWrapper} ref={selectRef}>
      <div
        className={styles.selectDisplay}
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => clearInputOnDelete(e)}
      >
        {searchable ? inputValue : inputValue || placeholder}
        {!inputValue && searchable && (
          <input
            ref={searchInputRef}
            className={styles.search}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        )}
        <span
          className={styles.arrow}
          style={{ transform: isOpen && options?.length ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <IconArrowDown />
        </span>
      </div>

      {isOpen && options?.length && (
        <ul className={styles.optionsList}>
          {filteredOptions.map((option) => (
            <li
              key={option}
              className={`${styles.optionItem} ${inputValue === option ? styles.selected : ''}`}
              onClick={() => {
                onChange(option);
                setInputValue(option);
                setSearch('');
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && <li className={styles.optionItem}>No options found</li>}
        </ul>
      )}
    </div>
  );
};
