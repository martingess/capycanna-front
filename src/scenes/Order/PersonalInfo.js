import { useTranslations } from 'next-intl';
import styles from './Order.module.scss';
import { useState } from 'react';
import OrderBill from '../../components/OrderBill';
import { useRouter } from 'next/router';
import { getPaymentMethods, getDeliveryMethods } from './utils';
import { Radio, ButtonCO } from '@UI';

const PersonalInfo = ({ setActiveTab, totalBasketPrice }) => {
  const t = useTranslations('order');
  const router = useRouter();

  const deliveryMethods = getDeliveryMethods(t);
  const paymentMethods = getPaymentMethods(t);

  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const goToHome = () => {
    router.push('/');
  };

  return (
    <section className={styles['main-template']}>
      <div className={styles['personal-info-content']}>
        {/* DELIVERY */}
        <div className={styles['main__title']}>{t('payment.deliveryTitle')}</div>
        <div className={styles['methods__items']}>
          {deliveryMethods?.map((method) => (
            <div
              key={method.id}
              className={styles['methods__item']}
              onClick={() => setDeliveryMethod(method)}
            >
              <div className={styles['item__header']}>
                <Radio
                  key={method.id}
                  id={method.id}
                  label={method?.title}
                  name={method?.title}
                  value={method.id}
                  isChecked={deliveryMethod.id === method.id}
                  handleSelection={() => setDeliveryMethod(method)}
                />
                <span className={styles['item-price']}>{method?.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles['form-divider']} />

        {/* PAYMETNS */}
        <div className={styles['main__title']}>{t('payment.paymentTitle')}</div>
        <div className={styles['methods__items']}>
          {paymentMethods?.map((method) => (
            <div
              key={method.id}
              className={styles['methods__item']}
              onClick={() => setPaymentMethod(method)}
            >
              <div className={styles['item__header']}>
                <Radio
                  key={method.id}
                  id={method.id}
                  label={method?.title}
                  name={method?.title}
                  value={method.id}
                  isChecked={paymentMethod.id === method.id}
                  handleSelection={() => setPaymentMethod(method)}
                />
                <span className={styles['item-price']}>{method?.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <OrderBill
          t={t}
          summary={totalBasketPrice}
          price={totalBasketPrice}
          total={totalBasketPrice}
          onPrevBtnClick={() => setActiveTab('payment')}
          onNextBtnClick={goToHome}
        />
      </div>
      <div className={styles['next-btn-mobile']}>
        <ButtonCO theme="orange" className={styles['next-btn']} onClick={goToHome}>
          {t('shoppingCart.sidebar.continue')}
        </ButtonCO>
      </div>
    </section>
  );
};

export default PersonalInfo;
