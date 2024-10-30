import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import configs from '@configs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const { STRIPE_KEY } = configs;
const ModalPaymentStatus = dynamic(() => import('@components/ModalPaymentStatus'), {
  ssr: false,
});

const stripe = await loadStripe(STRIPE_KEY);
const PaymentStatus = ({ redirectStatus }) => {
  const [status, setStatus] = useState('processing');

  const router = useRouter();
  const { payment_intent_client_secret } = router.query;

  useEffect(() => {
    const updateStatus = async () => {
      if (redirectStatus === 'succeeded') {
        setStatus('success');
      } else if (redirectStatus === 'failed') {
        setStatus('declined');
      } else if (redirectStatus === 'requires_action' && payment_intent_client_secret) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          payment_intent_client_secret,
        );

        if (error) {
          setStatus('declined');
        } else if (paymentIntent.status === 'succeeded') {
          setStatus('success');
        } else {
          setStatus('error');
        }
      }
    };

    updateStatus();
  }, [redirectStatus]);

  return (
    <ModalPaymentStatus
      visible={true}
      status={status}
      onClose={() => {}}
      onCloseCheckout={() => {}}
      failedRoute="/"
    />
  );
};
export default PaymentStatus;
