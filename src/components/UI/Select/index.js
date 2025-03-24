import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.scss';
import { IconArrowDown } from '@UI';

export const Select = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.selectWrapper} ref={selectRef}>
      <div className={styles.selectDisplay} onClick={() => setIsOpen(!isOpen)}>
        {value || placeholder}
        <span
          className={styles.arrow}
          style={{ transform: isOpen && options?.length ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <IconArrowDown />
        </span>
      </div>

      {isOpen && options?.length && (
        <ul className={styles.optionsList}>
          {options.map((option) => (
            <li
              key={option}
              className={`${styles.optionItem} ${value === option ? styles.selected : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
