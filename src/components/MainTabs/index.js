import { useState, useRef } from 'react';
import styles from './MainTabs.module.scss';
import { ButtonCO } from '@UI';
import Image from 'next/image';

const MainTabs = ({
  t,
  activeTab,
  setActiveTab,
  tab1,
  tab2,
  tab3,
  tab1Slug,
  tab2Slug,
  tab3Slug,
}) => {
  const isTabActive = (tab) => activeTab === tab;

  return (
    <div className={styles['tabs']}>
      <button
        className={
          isTabActive(tab1Slug || 'characteristics')
            ? `${styles['tabs__item']} ${styles['active']}`
            : styles['tabs__item']
        }
        onClick={() => setActiveTab(tab1Slug || 'characteristics')}
      >
        {tab1}
      </button>
      <button
        className={
          isTabActive(tab2Slug || 'description')
            ? `${styles['tabs__item']} ${styles['active']}`
            : styles['tabs__item']
        }
        onClick={() => setActiveTab(tab2Slug || 'description')}
      >
        {tab2}
      </button>
      <button
        className={
          isTabActive(tab3Slug || 'reviews')
            ? `${styles['tabs__item']} ${styles['active']}`
            : styles['tabs__item']
        }
        onClick={() => setActiveTab(tab3Slug || 'reviews')}
      >
        {tab3}
      </button>
    </div>
  );
};

export default MainTabs;
