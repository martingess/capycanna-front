import styles from './ProductsButton.module.scss';
import { useTranslations } from 'next-intl';
import cn from 'classnames';
import Image from 'next/image';

const ProductsButton = ({ alarm }) => {
  const tCommon = useTranslations('common');
  return (
    <div className={styles['products']}>
      <span className={styles['products__text']}>{tCommon('products')}</span>
      <div className={cn(styles['products__button'], { [styles['alarm']]: alarm })}>
        <span className={styles['products__button-text']}></span>
        <Image src="/images/home/mob-search.svg" alt="search" width={30} height={30} />
      </div>
    </div>
  );
};

export default ProductsButton;
