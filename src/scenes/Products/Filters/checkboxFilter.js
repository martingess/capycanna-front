import React from 'react';
import { CheckBox } from '@UI';
import Image from 'next/image';
import styles from '../Products.module.scss';

const CheckboxFilter = ({
  className,
  filter,
  isCheckBoxFilterOpened,
  setIsCheckBoxFilterOpened,
  filtersState,
  handleCheckboxChange,
}) => {
  return (
    <div className={className}>
      <div
        className={styles['dropdown']}
        onClick={() => setIsCheckBoxFilterOpened(!isCheckBoxFilterOpened)}
      >
        <span className={styles['dropdown__title']}>{filter.title}</span>
        <Image
          style={{
            transform: isCheckBoxFilterOpened ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.2s',
          }}
          src={'/images/products/filter-arrow.svg'}
          width={14}
          height={14}
          alt="filter-icon"
        />
      </div>
      {isCheckBoxFilterOpened &&
        filter.params.map((param) => (
          <CheckBox
            key={param.key}
            id={`${filter.title}-${param.key}`}
            label={param.label}
            name={filter.title}
            value={param.key}
            subcategories={param?.subcategories}
            isChecked={(filtersState[filter.title] || []).includes(param.key)}
            handleSelection={() => handleCheckboxChange(param.key, filter.title)}
          />
        ))}
    </div>
  );
};

export default CheckboxFilter;
