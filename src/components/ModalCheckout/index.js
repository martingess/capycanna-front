import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { IconClose } from '@UI';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import styles from './ModalCheckout.module.scss';
import { gaEventDispatch, fbEventDispatch } from '@utils';
const StripeForm = dynamic(() => import('@components/StripeForm'), {
  ssr: false,
});

const ModalCheckout = ({ visible, onClose, selectedPlan }) => {
  useEffect(() => {
    gaEventDispatch({ event: 'iframe_checkout_content_show' });
    fbEventDispatch({
      event: 'InitiateCheckout',
      parameters: { currency: selectedPlan?.currency, value: selectedPlan?.price },
    });
  }, []);
  return (
    <div
      className={clsx(styles['modal'], {
        [styles['isVisible']]: visible,
      })}
    >
      <div className={styles['modal__wrapper']}>
        <div className={styles['modal__content']}>
          <div className={styles['modal__top']}>
            <button className={styles['modal__button']} onClick={onClose}>
              <IconClose className={styles['modal__button-icon']} />
            </button>
          </div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <StripeForm {...selectedPlan} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModalCheckout;
