import styles from './OrderBill.module.scss';
import { ButtonCO } from '@UI';
import { getVatValue } from '../../scenes/Order/utils';

const OrderBill = ({ summary, price, total, onNextBtnClick, onPrevBtnClick, t }) => {
  return (
    <>
      <div className={styles['sidebar-wrapper']}>
        <h2 className={styles['sidebar-title']}>{t('shoppingCart.sidebar.title')}</h2>
        <div className={styles['amount-row']}>
          <p>{t('shoppingCart.sidebar.subtotal')}</p>
          <p>{summary} €</p>
        </div>
        <div className={styles['amount-row']}>
          {t('shoppingCart.sidebar.priceVat')}
          <p>{getVatValue(price)} €</p>
        </div>
        <div className={styles['amount-row']}>
          {t('shoppingCart.sidebar.delivery')}
          <p>{t('shoppingCart.sidebar.deliveryValue')}</p>
        </div>
        <div className={`${styles['amount-row']} ${styles['amount-row__total']}`}>
          {t('shoppingCart.sidebar.total')}
          <p style={{ fontWeight: '600' }}>{+getVatValue(total) + total} €</p>
        </div>
        <ButtonCO theme="orange" className={styles['next-btn']} onClick={onNextBtnClick}>
          {t('shoppingCart.sidebar.continue')}
        </ButtonCO>
      </div>
      {/* <div className={styles['next-btn-mobile']}>
        <ButtonCO
          theme="orange"
          className={styles['next-btn']}
          onClick={onNextBtnClick}
        >
          {t('shoppingCart.sidebar.continue')}
        </ButtonCO>
      </div> */}
    </>
  );
};

export default OrderBill;
