import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
// import { gaEventDispatch } from '@utils';
import { useRouter } from 'next/router';
import { NavBar } from '@UI';
import clsx from 'clsx';
import styles from './PaymentStatus.module.scss';

const statuses = {
  error: {
    image: 'error.svg',
    header: 'Oops...',
    message: 'Something went wrong',
    button: 'Try again',
  },
  success: {
    image: 'success.svg',
    header: 'Payment Success!',
    message: 'Your payment has been successfully done.',
    button: 'Got it',
  },
  declined: {
    image: 'declined.svg',
    header: 'Payment Denied',
    message: 'Your payment has been denied.',
    button: 'Try again',
  },
  processing: {
    image: 'processing.svg',
    header: 'Payment Processing',
  },
};

const PaymentStatus = ({ visible, status, onClose, onCloseCheckout, failedRoute }) => {
  const router = useRouter();
  const { route } = router;
  let changeTimeOut = null;
  const ifPaymentStatusPage = route.includes('payment-status');

  const handleModalClose = () => {
    if (status === 'success') {
      // gaEventDispatch({ event: 'payment_success_show' });
      onCloseCheckout();
      onClose(true);
      router.push('/checkout/account');
    } else {
      if (failedRoute) {
        router.push(failedRoute);
      }
      onCloseCheckout();
      onClose();
    }
  };

  useEffect(() => {
    if (status === 'success' && !ifPaymentStatusPage) {
      changeTimeOut = setTimeout(() => {
        // gaEventDispatch({ event: 'payment_success_show' });
        onCloseCheckout();
        onClose(true);
        router.push('/checkout/account');
      }, 3000);

      return () => {
        clearTimeout(changeTimeOut);
      };
    } else if (ifPaymentStatusPage) {
      changeTimeOut = setTimeout(() => {
        router.push('/checkout/account');
      }, 3000);

      return () => {
        clearTimeout(changeTimeOut);
      };
    }
    // if (status === 'error') {
    //   gaEventDispatch({ event: 'error_show' });
    // } else if (status === 'declined') {
    //   gaEventDispatch({ event: 'payment_denied_show' });
    // } else if (status === 'processing') {
    //   gaEventDispatch({ event: 'payment_processing_show' });
    // }
  }, [status]);
  return (
    <div
      className={clsx(styles['modal'], {
        [styles['isVisible']]: visible,
      })}
    >
      <div className={styles['modal_wrapper']}>
        <div
          className={clsx(styles['modal_content'], {
            [styles[status]]: status,
          })}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            {statuses[status] && (
              <Image
                src={`/images/checkout/${statuses[status].image}`}
                width={120}
                height={120}
                alt={statuses[status].header}
              />
            )}
            {statuses[status] && statuses[status].header ? (
              <h6>{statuses[status].header}</h6>
            ) : null}
            {statuses[status] && statuses[status].message ? (
              <p>{statuses[status].message}</p>
            ) : null}
          </motion.div>
        </div>
      </div>
      {statuses[status] && statuses[status].button ? (
        <NavBar text={statuses[status].button} onClick={handleModalClose} />
      ) : null}
    </div>
  );
};

export default PaymentStatus;
