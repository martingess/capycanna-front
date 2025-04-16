import styles from './MainTabs.module.scss';

const MainTabs = ({
  activeTab,
  setActiveTab,
  tab1,
  tab2,
  tab3,
  tab1Slug,
  tab2Slug,
  tab3Slug,
  lockedTabs = {},
}) => {
  const isTabActive = (tab) => activeTab === tab;

  const handleTabClick = (slug) => {
    const isLocked = lockedTabs?.[slug];
    if (!isLocked) {
      setActiveTab(slug);
    }
  };

  return (
    <div className={styles['tabs']}>
      <button
        className={
          isTabActive(tab1Slug || 'characteristics')
            ? `${styles['tabs__item']} ${styles['active']}`
            : styles['tabs__item']
        }
        onClick={() => handleTabClick(tab1Slug || 'characteristics')}
      >
        {tab1}
      </button>
      <button
        className={
          isTabActive(tab2Slug || 'description')
            ? `${styles['tabs__item']} ${styles['active']}`
            : styles['tabs__item']
        }
        onClick={() => handleTabClick(tab2Slug || 'description')}
        disabled={lockedTabs?.[tab2Slug]}
      >
        {tab2}
      </button>
      <button
        className={
          isTabActive(tab3Slug || 'reviews')
            ? `${styles['tabs__item']} ${styles['active']}`
            : styles['tabs__item']
        }
        onClick={() => handleTabClick(tab3Slug || 'reviews')}
        disabled={lockedTabs?.[tab3Slug]}
      >
        {tab3}
      </button>
    </div>
  );
};

export default MainTabs;
