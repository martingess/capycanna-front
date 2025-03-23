import styles from './CartButton.module.scss';
import { useTranslations } from 'next-intl';
import { IconCart } from '@UI';
import cn from 'classnames';
import Link from 'next/link';

const CartButton = ({ alarm }) => {
  const tCommon = useTranslations('common');
  return (
    <Link href="/order" prefetch={false}>
      <div className={styles['cart']}>
        <span className={styles['cart__text']}>{tCommon('cart')}</span>
        <div className={cn(styles['cart__button'], { [styles['alarm']]: alarm })}>
          <span className={styles['cart__button-text']}></span>
          <IconCart />
        </div>
      </div>
    </Link>
  );
};

export default CartButton;
