import styles from './ProductCount.module.scss';

const ProductCount = ({ value, onIncrement, onDecrement }) => {
  return (
    <div className={styles['product-count']}>
      <button className={styles['btn-left']} onClick={onDecrement}>
        -
      </button>
      <p>{value}</p>
      <button className={styles['btn-right']} onClick={onIncrement}>
        +
      </button>
    </div>
  );
};

export { ProductCount };
