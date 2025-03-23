import React, { useState, useRef, useEffect } from 'react';
import styles from './PhonePrefixSelect.module.scss';
import Image from 'next/image';
import { IconArrowDown } from '@UI';

export const PhonePrefixSelect = ({ value, onChange, options, placeholder }) => {
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
        <Image width={25} height={18} alt={value?.title} src={value?.flag || placeholder?.flag} />
        {value?.prefix || placeholder?.prefix}
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
              key={option?.id}
              className={`${styles.optionItem} ${value?.title === option?.title ? styles.selected : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              <Image width={25} height={18} alt={option?.title} src={option?.flag} />
              {option.prefix}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
