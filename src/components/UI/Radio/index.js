import styles from './Radio.module.scss';

export const Radio = ({ key, label, name, value, isChecked, handleSelection }) => {
  return (
    <div key={key} className={styles['radio-container']}>
      <label className={styles['radio']}>
        <span
          className={`${styles['radio__check']} ${isChecked ? styles['radio__check-active'] : ''}`}
        ></span>
        <span className={styles['radio__label']}>{label}</span>
        <input
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleSelection}
          className={styles['radio__input']}
        />
      </label>
    </div>
  );
};
