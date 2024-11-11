import styles from './CartButton.module.scss';
import { useTranslations } from 'next-intl';
import { IconCart } from '@UI';
import cn from 'classnames';

const CartButton = ({ alarm }) => {
  const tCommon = useTranslations('common');
  return (
    <div className={styles['cart']}>
      <span className={styles['cart__text']}>{tCommon('cart')}</span>
      <div className={cn(styles['cart__button'], { [styles['alarm']]: alarm })}>
        <span className={styles['cart__button-text']}></span>
        <IconCart />
      </div>
    </div>
  );
};

export default CartButton;
