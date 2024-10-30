import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ButtonCO, Loader, IconLock } from '@UI';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
  reportError,
  addedZero,
  fbEventDispatch,
  getGaClientId,
  getFbClientId,
  getDataAnalytics,
} from '@utils';
import {
  setClientSecret,
  selectClientSecret,
  setSubscriptionId,
  setPaymentStatus,
  selectPaymentStatus,
  setCustomerId,
} from '@store/billing/billingSlices';
import { selectCountry, selectEmail } from '@store/user/userSlices';
import styles from './StripeForm.module.scss';
import cn from 'classnames';
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  ExpressCheckoutElement,
} from '@stripe/react-stripe-js';

import configs from '@configs';

const { STRIPE_KEY, DOMAIN_FRONT } = configs;

function CheckoutForm({ clientSecret, country, currency, currencySymbol, price, productName }) {
  const t = useTranslations('checkout.modal');
  const tPlans = useTranslations('checkout.plans');
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const [paymentRequest, setPaymentRequest] = useState(null);

  const [isCardNumberComplete, setIsCardNumberComplete] = useState(null);
  const [isCardExpiryComplete, setIsCardExpiryComplete] = useState(null);
  const [isCardCvcComplete, setIsCardCvcComplete] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          dispatch(setPaymentStatus('success'));
          fbEventDispatch({ event: 'Purchase', parameters: { currency, value: price } }, true);
          dispatch(setClientSecret(null));
          break;
        case 'processing':
          dispatch(setPaymentStatus('processing'));
          break;
        default:
          break;
      }
    });
  }, [clientSecret, price, stripe, dispatch]);

  const onConfirm = (stripe, elements) => async (event) => {
    try {
      let confirmPaymentResult = {};

      if (['apple_pay', 'google_pay', 'link'].includes(event.expressPaymentType)) {
        confirmPaymentResult = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${DOMAIN_FRONT}/checkout/payment-status`,
          },
        });
      } else {
        confirmPaymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: event.paymentMethod.id,
          return_url: `${DOMAIN_FRONT}/checkout/payment-status`,
        });
      }

      const { paymentIntent, error } = confirmPaymentResult;

      if (error) {
        event?.complete && event?.complete('fail');
        dispatch(setPaymentStatus('error'));
        reportError({ error });
      } else {
        event?.complete && event?.complete('success');
        if (paymentIntent.status === 'succeeded') {
          dispatch(setPaymentStatus('success'));
          fbEventDispatch({ event: 'Purchase', parameters: { currency, value: price } }, true);
          dispatch(setClientSecret(null));
        } else {
          dispatch(setPaymentStatus('declined'));
        }
      }
    } catch (error) {
      reportError({ error });
      event?.complete && event?.complete('fail');
      dispatch(setPaymentStatus('error'));
    }
  };

  useEffect(() => {
    try {
      if (!stripe || !price || !currency || !country) {
        return;
      }

      const pr = stripe.paymentRequest({
        country: country,
        currency: currency.toLowerCase(),
        total: {
          label: 'Total',
          amount: +(price * 100).toFixed(0),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setCanMakePayment(true);
        }
      });

      pr.on('paymentmethod', onConfirm(stripe));

      setPaymentRequest(pr);
    } catch (error) {
      reportError({ error });
    }
  }, [clientSecret, price, currency, country, stripe, dispatch]);

  const checkCard = () => {
    const result = [];
    [
      { value: isCardNumberComplete, method: setIsCardNumberComplete },
      { value: isCardExpiryComplete, method: setIsCardExpiryComplete },
      { value: isCardCvcComplete, method: setIsCardCvcComplete },
    ].forEach(({ value, method }) => {
      if (value === null) {
        method({ error: true });
        result.push(true);
      } else if (value.error) {
        result.push(true);
      }
    });

    return result.length === 0;
  };

  const handleSubmit =
    ({ email }) =>
    async (e) => {
      e.preventDefault();

      if (!stripe || !elements || !checkCard()) {
        return;
      }
      dispatch(setPaymentStatus('processing'));
      const cardNumberElement = elements.getElement(CardNumberElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          email,
        },
      });

      if (error) {
        dispatch(setPaymentStatus('error'));
        reportError({ error });
        return;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
        return_url: `${DOMAIN_FRONT}/checkout/payment-status`,
      });
      if (confirmError) {
        dispatch(setPaymentStatus('declined'));
        reportError({ error: confirmError });
      } else if (paymentIntent.status === 'succeeded') {
        dispatch(setPaymentStatus('success'));
        fbEventDispatch({ event: 'Purchase', parameters: { currency, value: price } }, true);
        dispatch(setClientSecret(null));
      } else {
        dispatch(setPaymentStatus('declined'));
      }
    };

  const cardElementOptions = {
    style: {
      base: {
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        fontSize: '18px',
      },
      invalid: {
        color: '#ff4d4f',
        iconColor: '#ff4d4f',
      },
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit({ email })}>
      <Image
        className={styles['form__logo']}
        src={`/images/logo.svg`}
        width={60}
        height={50}
        quality={100}
        alt="logo risemee"
      />
      <p className={styles['form__plan']}>{tPlans(productName)}</p>
      <p className={styles['form__price']}>
        {currencySymbol}
        {addedZero(price)}
      </p>

      {canMakePayment && paymentRequest && clientSecret && price && elements && (
        <>
          <ExpressCheckoutElement
            key={`${clientSecret}-${price}`}
            clientSecret={clientSecret}
            onComplete={(result) => {
              if (result.error) {
                dispatch(setPaymentStatus('error'));
                confirmError({ error: result.error });
              } else if (result.paymentIntent.status === 'succeeded') {
                dispatch(setPaymentStatus('success'));
                fbEventDispatch(
                  { event: 'Purchase', parameters: { currency, value: price } },
                  true,
                );
                dispatch(setClientSecret(null));
              } else {
                dispatch(setPaymentStatus('declined'));
              }
            }}
            onConfirm={onConfirm(stripe, elements)}
          />
          <p className={styles['form__or']}>
            <span>{t('orPay')}</span>
          </p>
        </>
      )}
      <p className={styles['form__title']}>Card information</p>
      <div className={styles['card']}>
        <div
          className={cn(styles['card__elem'], {
            [styles['error']]: isCardNumberComplete?.error,
          })}
        >
          <CardNumberElement
            id="card-number"
            options={cardElementOptions}
            onChange={({ empty, complete, error }) =>
              setIsCardNumberComplete({ empty, complete, error })
            }
          />
          <div className={styles['card__elem-icons']}>
            <Image
              src={`/images/checkout/mastercard.svg`}
              width={60}
              height={30}
              quality={100}
              alt="mastercard"
            />
            <Image
              src={`/images/checkout/visa.svg`}
              width={60}
              height={30}
              quality={100}
              alt="visa"
            />
          </div>
        </div>
        <div className={styles['card__elem-bottom']}>
          <div
            className={cn(styles['card__elem'], {
              [styles['error']]: isCardExpiryComplete?.error,
            })}
          >
            <CardExpiryElement
              id="card-expiry"
              options={cardElementOptions}
              onChange={({ empty, complete, error }) =>
                setIsCardExpiryComplete({ empty, complete, error })
              }
            />
          </div>
          <div
            className={cn(styles['card__elem'], {
              [styles['error']]: isCardCvcComplete?.error,
            })}
          >
            <CardCvcElement
              id="card-cvc"
              options={cardElementOptions}
              onChange={({ empty, complete, error }) =>
                setIsCardCvcComplete({ empty, complete, error })
              }
            />
            <div className={styles['card__elem-icons']}>
              <Image
                src={`/images/checkout/cvv.svg`}
                width={60}
                height={30}
                quality={100}
                alt="cvv"
              />
            </div>
          </div>
        </div>
      </div>
      <ButtonCO
        disabled={selectPaymentStatus === 'processing' || !stripe || !elements}
        id="submit"
        type="submit"
        theme={'checkout'}
        icon={IconLock}
        className={styles['form__button']}
      >
        {t('payButton')}
      </ButtonCO>
    </form>
  );
}

const stripePromise = loadStripe(STRIPE_KEY);

export default function StripeForm({ code, period, discount, currency, currencySymbol, price }) {
  const dispatch = useDispatch();
  const clientSecret = useSelector(selectClientSecret);
  const country = useSelector(selectCountry);
  const email = useSelector(selectEmail);
  const [loader, setLoader] = useState(true);

  const productName = `${period.count}${period.type}`;
  const couponId = discount?.promoCode;
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const gaClientId = getGaClientId();
        const fbClientId = getFbClientId();

        const response = await fetch('/back/billing/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-id': 'site',
          },
          body: JSON.stringify({
            priceId: code,
            metadata: {
              gaClientId,
              fbClientId,
              ...getDataAnalytics(),
            },
            ...(email && { email }),
            ...(couponId && { couponId }),
          }),
        });

        setLoader(false);
        const { data } = await response.json();

        const { clientSecret, subscriptionId, customerId } = data ?? {};
        dispatch(setClientSecret(clientSecret));
        dispatch(setSubscriptionId(subscriptionId));
        dispatch(setCustomerId(customerId));
      } catch (error) {
        reportError({ error });
      }
    };

    fetchClientSecret();
  }, [code, price]);

  return (
    <div style={{ minHeight: '300px' }}>
      {clientSecret && country && stripePromise && !loader ? (
        <Elements
          key={code}
          options={{
            clientSecret,
          }}
          stripe={stripePromise}
        >
          <CheckoutForm
            clientSecret={clientSecret}
            country={country}
            currency={currency}
            currencySymbol={currencySymbol}
            price={price}
            productName={productName}
          />
        </Elements>
      ) : (
        <div className={styles['load']}>
          <Loader />
        </div>
      )}
    </div>
  );
}
