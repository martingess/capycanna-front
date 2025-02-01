import styles from './CheckBox.module.scss';

export const CheckBox = ({ key, label, name, value, isChecked, handleSelection }) => {
  return (
    <div key={key} className={styles['checkbox-container']}>
      <label className={styles['checkbox']}>
        <span
          className={`${styles['checkbox__check']} ${isChecked ? styles['checkbox__check-active'] : ''}`}
        ></span>
        <span className={styles['checkbox__label']}>{label}</span>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleSelection}
          className={styles['checkbox__input']}
        />
      </label>
    </div>
  );
};
