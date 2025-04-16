import styles from './CheckBox.module.scss';
import Image from 'next/image';
import { useState } from 'react';

export const CheckBox = ({
  label,
  name,
  value,
  subcategories = [],
  isChecked,
  handleSelection,
}) => {
  const [isSubCategoryOpened, setIsSubCategoryOpened] = useState(false);
  const [subcategoriesArr, setSubcategoriesArr] = useState(subcategories);

  const handleSubSelection = (param) => {
    const updatedSubcategories = subcategoriesArr.map((sub) => {
      if (sub.key === param.key) {
        return { ...sub, checked: !sub.checked };
      }
      return sub;
    });

    setSubcategoriesArr(updatedSubcategories);
  };

  return (
    <div className={styles['checkbox-container']}>
      <label className={styles['checkbox']}>
        <span
          className={`${styles['checkbox__check']} ${
            isChecked ? styles['checkbox__check-active'] : ''
          }`}
        ></span>
        <span className={styles['checkbox__label']}>{label}</span>

        {subcategoriesArr.length > 0 && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsSubCategoryOpened((prev) => !prev);
            }}
          >
            <Image
              style={{
                transform: isSubCategoryOpened ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.2s',
                marginLeft: '4px',
                cursor: 'pointer',
              }}
              src={'/images/products/filter-arrow.svg'}
              width={14}
              height={14}
              alt="filter-icon"
            />
          </span>
        )}
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          onChange={() => handleSelection({ name, value })}
          className={styles['checkbox__input']}
        />
      </label>

      {/* Render subcategories */}
      {isSubCategoryOpened && subcategoriesArr.length > 0 && (
        <div className={styles['checkbox__subcategories']}>
          {subcategoriesArr.map((param) => (
            <label key={param.key} className={styles['checkbox']}>
              <span
                className={`${styles['checkbox__check']} ${
                  param.checked ? styles['checkbox__check-active'] : ''
                }`}
              ></span>
              <span className={styles['checkbox__label']}>{param.label}</span>

              <input
                type="checkbox"
                name={param.label}
                value={param.key}
                checked={param.checked}
                onChange={() => handleSubSelection(param)}
                className={styles['checkbox__input']}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
