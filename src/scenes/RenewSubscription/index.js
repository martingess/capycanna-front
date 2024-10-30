import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { NavBar } from '@UI';
import clsx from 'clsx';
import styles from './RenewSubscription.module.scss';

const RenewSubscription = () => {
  const router = useRouter();
  const t = useTranslations('renewSubscription');
  const { subscriptionId } = router.query;

  const [processing, setProcessing] = useState(true);
  const [statusResponse, setStatusResponse] = useState('success');

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch('/back/billing/renew-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-id': 'site',
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      });
      const { error } = await response.json();
      if (error) {
        setStatusResponse('error');
      } else {
        setStatusResponse('success');
      }
      setProcessing(false);
    };
    if (subscriptionId) {
      fetchClientSecret();
    }
  }, [subscriptionId]);
  const handlerButton = (status) => () => {
    router.push(status === 'success' ? `/onboarding/funnel` : `/`);
  };

  return (
    <div
      className={clsx(styles['renew'], {
        [styles['isVisible']]: true,
      })}
    >
      <div className={styles['renew_wrapper']}>
        {processing ? (
          <div
            className={clsx(styles['renew_content'], {
              [styles['processing']]: 'processing',
            })}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={`/images/checkout/processing.svg`}
                width={120}
                height={120}
                alt={'processing'}
              />
            </motion.div>
          </div>
        ) : (
          <div
            className={clsx(styles['renew_content'], {
              [styles['success']]: statusResponse,
            })}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={`/images/checkout/${statusResponse}.svg`}
                width={120}
                height={120}
                alt="success"
              />
              <h6>{t(`${statusResponse}.header`)}</h6>
              <p>{t(`${statusResponse}.message`)}</p>
            </motion.div>
          </div>
        )}
      </div>
      {!processing ? (
        <NavBar text={t(`${statusResponse}.button`)} onClick={handlerButton(statusResponse)} />
      ) : null}
    </div>
  );
};

export default RenewSubscription;
