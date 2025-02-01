import { IconArrowDown } from '@UI';
import { useState } from 'react';
import styles from './Sorting.module.scss';
import cn from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ProductsSorting = ({ onSort = () => {}, currentSortingKey }) => {
  const t = useTranslations('products');

  const sortings = [
    {
      key: 'ascendingPrice',
      value: t('sorting.ascendingPrice'),
    },
    {
      key: 'descendingPrice',
      value: t('sorting.descendingPrice'),
    },
    {
      key: 'mostPopular',
      value: t('sorting.mostPopular'),
    },
    {
      key: 'onSale',
      value: t('sorting.onSale'),
    },
  ];
  const [currentSorting, setCurrentSorting] = useState(sortings[0]);
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleList = () => {
    setIsListOpen((prev) => !prev);
  };

  const changeSorting = (sorting) => {
    setCurrentSorting(sorting);
    onSort(sorting.key);
    toggleList();
  };

  return (
    <div className={styles['sorting']}>
      <div
        className={cn(styles['sorting__wrapper'], {
          [styles['open']]: isListOpen,
        })}
      >
        <div className={styles['sorting__top']} onClick={toggleList}>
          <Image
            src={'/images/products/cheapest-sorting.svg'}
            width={24}
            height={24}
            alt="filter-icon"
          />
          <p className={styles['sorting__name']}>{currentSorting.value}</p>
          <IconArrowDown className={styles['sorting__arrow']} />
          {/* <Image
            style={{transform: 'rotate(180deg)'}}
            src={'/images/products/filter-arrow.svg'}
            width={14}
            height={14}
            alt="filter-icon"
          /> */}
        </div>
        <div className={styles['sorting__list']}>
          {sortings.map((item) => {
            return (
              <div
                key={item.key}
                aria-label={`Change sorting to ${item.key}`}
                className={cn(styles['sorting__item'], {
                  [styles['active']]: item.key === currentSorting.key,
                })}
                onClick={() => changeSorting(item)}
              >
                {item.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsSorting;
