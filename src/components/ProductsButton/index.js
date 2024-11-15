import styles from './ProductsButton.module.scss';
import { useTranslations } from 'next-intl';
import { IconHemp } from '@UI';
import cn from 'classnames';

const ProductsButton = ({ alarm }) => {
  const tCommon = useTranslations('common');
  return (
    <div className={styles['products']}>
      <span className={styles['products__text']}>{tCommon('products')}</span>
      <div className={cn(styles['products__button'], { [styles['alarm']]: alarm })}>
        <span className={styles['products__button-text']}></span>
        <IconHemp />
      </div>
    </div>
  );
};

export default ProductsButton;
