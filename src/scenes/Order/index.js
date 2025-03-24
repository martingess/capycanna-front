import { useTranslations } from 'next-intl';
import Head from 'next/head';
import styles from './Order.module.scss';
import MainTabs from '../../components/MainTabs';
import { useState, useMemo } from 'react';
import ShoppingCart from './ShoppingCart';
import Payment from './Payment';
import PersonalInfo from './PersonalInfo';
import { mockProducts } from '@/data/mockProducts';

const Order = () => {
  const t = useTranslations('order');
  const [activeTab, setActiveTab] = useState('shoppingCart');

  const [basketItems, setBasketItems] = useState([
    { ...mockProducts[0], count: 1 },
    { ...mockProducts[1], count: 1 },
  ]);
  const totalBasketPrice = useMemo(() => {
    return basketItems.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace(/[^0-9,.-]/g, '').replace(',', '.')) * item?.count,
      0,
    );
  }, [basketItems]);

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['main-wrapper']}>
        <MainTabs
          t={t}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tab1={
            <p className={styles['tab-title']}>
              <span className={styles['tab-number']}>1</span> {t('tabs.shoppingCart')}
            </p>
          }
          tab2={
            <p className={styles['tab-title']}>
              <span className={styles['tab-number']}>2</span> {t('tabs.personalInfo')}
            </p>
          }
          tab3={
            <p className={styles['tab-title']}>
              <span className={styles['tab-number']}>3</span> {t('tabs.payment')}
            </p>
          }
          tab1Slug={'shoppingCart'}
          tab2Slug={'payment'}
          tab3Slug={'personalInfo'}
        />
        {activeTab === 'shoppingCart' && (
          <ShoppingCart
            setActiveTab={setActiveTab}
            totalBasketPrice={totalBasketPrice}
            basketItems={basketItems}
            setBasketItems={setBasketItems}
          />
        )}
        {activeTab === 'payment' && (
          <Payment setActiveTab={setActiveTab} totalBasketPrice={totalBasketPrice} />
        )}
        {activeTab === 'personalInfo' && (
          <PersonalInfo setActiveTab={setActiveTab} totalBasketPrice={totalBasketPrice} />
        )}
      </section>
    </>
  );
};

export default Order;
