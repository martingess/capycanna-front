import { useState, useRef } from 'react';
import Get from '@components/Get';
import { reportError, gaEventDispatch } from '@utils';
import { useEffect } from 'react';
import FaqPlan from '@components/FaqPlan';
import ReviewsPlan from '@components/ReviewsPlan';
import dynamic from 'next/dynamic';
import ModalCheckout from '@components/ModalCheckout';
import ModalRetention from '@/components/ModalRetention';
import styles from './Checkout.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setEmailAccount, setPasswordAccount } from '@store/account/accountSlices';
import {
  setPaymentStatus,
  selectPaymentStatus,
  selectPrices,
  setPrices,
} from '@store/billing/billingSlices';

const ModalPaymentStatus = dynamic(() => import('@components/ModalPaymentStatus'), {
  ssr: false,
});
const TimerPlan = dynamic(() => import('@components/TimerPlan'), {
  ssr: false,
});
const Plans = dynamic(() => import('@components/Plans'), {
  ssr: false,
});

const formatPrice = (prices) => {
  try {
    const { items, currency, currencySymbol } = prices;
    const result = items.map(({ alias, code, price, oldPrice, promoCode, promoPercent }) => {
      const [periodCount, periodType] = alias?.split('_');
      return {
        code,
        period: {
          count: periodCount,
          type: periodType,
        },
        price,
        oldPrice,
        discount: {
          promoPercent,
          promoCode,
        },
        currency,
        currencySymbol,
      };
    });

    return result;
  } catch (error) {
    reportError({ error });
    return [];
  }
};

const CheckoutPage = ({ typePrices = 'default' }) => {
  const dispatch = useDispatch();
  const prices = useSelector(selectPrices);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [visibleCheckout, setVisibleCheckout] = useState({
    visible: false,
    provider: 'stripe',
  });

  const [retentionShown, setRetentionShown] = useState(false);
  const [visibleRetention, setVisibleRetention] = useState(false);
  const plans = prices ? formatPrice(prices) : [];
  const paymentStatus = useSelector(selectPaymentStatus);

  const handlePlan = (plan) => {
    setSelectedPlan(() => plan);
  };

  const handleSubmit = () => {
    if (!selectedPlan) return;
    setVisibleCheckout(() => ({
      visible: true,
      status: 'stripe',
    }));
    document.body.classList.add('modal');
  };

  const handleModalClose = () => {
    setVisibleCheckout((prev) => ({
      ...prev,
      visible: false,
    }));
    document.body.classList.remove('modal');
    handleRetention(true);
  };

  const handleRetention = (show) => {
    if (show && !retentionShown && !paymentStatus) {
      setVisibleRetention(true);
      setRetentionShown(true);
      document.body.classList.add('modal');
    } else {
      setVisibleRetention(false);
      document.body.classList.remove('modal');
    }
  };

  const handleModalStatusClose = (noChangeVisible) => {
    if (!noChangeVisible) {
      setVisibleCheckout((prev) => ({
        ...prev,
        visible: false,
      }));
    }
    dispatch(setPaymentStatus(null));
  };

  useEffect(() => {
    const fetchClientPrices = async () => {
      const response = await fetch(`/back/billing/prices?type=${typePrices?.toLowerCase()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-id': 'site',
        },
      });

      const { data, error } = await response.json();
      if (!error) {
        dispatch(setPrices(data));
      }
    };

    fetchClientPrices();
  }, [typePrices]);

  useEffect(() => {
    if (!selectedPlan && prices) {
      setSelectedPlan(prices.items[1].code);
    }
  }, [prices]);

  useEffect(() => {
    dispatch(setPasswordAccount(null));
    dispatch(setEmailAccount(null));
  }, []);

  return (
    <>
      <section className={styles['wrapper']}>
        <TimerPlan plan={selectedPlan} handleSubmit={handleSubmit} />
        <Plans
          plan={selectedPlan}
          handlePlan={handlePlan}
          plans={plans}
          handleSubmit={handleSubmit}
          translations="checkout.plans"
        />
        <Get translations="checkout.get" />
        <FaqPlan translations="checkout.faq" />
        <ReviewsPlan translations="checkout.reviews" />
        <Plans
          plan={selectedPlan}
          handlePlan={handlePlan}
          plans={plans}
          handleSubmit={handleSubmit}
          translations="checkout.plans"
        />
      </section>
      {visibleCheckout?.visible && (
        <ModalCheckout
          {...visibleCheckout}
          onClose={handleModalClose}
          selectedPlan={plans.find(({ code }) => code === selectedPlan)}
        />
      )}
      {!!visibleRetention && (
        <ModalRetention visible={!!visibleRetention} onClose={() => handleRetention(false)} />
      )}
      <ModalPaymentStatus
        visible={!!paymentStatus}
        status={paymentStatus}
        onClose={handleModalStatusClose}
        onCloseCheckout={handleModalClose}
      />
    </>
  );
};

export default CheckoutPage;
