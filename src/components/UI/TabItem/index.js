import styles from './TabItem.module.scss';

const TabItem = ({ key, value, isActive, onClick }) => {
  return (
    <div
      key={key}
      className={`${isActive ? `${styles['tab']} ${styles['tab__active']}` : styles['tab']}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export { TabItem };
