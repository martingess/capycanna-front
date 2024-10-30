import cn from 'classnames';
import { useTranslations } from 'next-intl';
import styles from './ActivateAccount.module.scss';
import { useEffect, useState } from 'react';
import { IconCheck, Loader } from '@UI';
import Link from 'next/link';
import { reportError, trimEmail, gaEventDispatch } from '@utils';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubscriptionId, selectCustomerId } from '@store/billing/billingSlices';
import { selectEmail } from '@store/user/userSlices';
import {
  selectEmailAccount,
  selectPasswordAccount,
  setEmailAccount,
  setPasswordAccount,
} from '@store/account/accountSlices';
import { useRouter } from 'next/router';

const DownloadButtons = dynamic(() => import('@components/DownloadButtons'), {
  ssr: false,
});
const CopyData = dynamic(() => import('@components/CopyData'), {
  ssr: false,
});

const ActivateAccount = () => {
  const t = useTranslations('activateAccount');
  const tCommon = useTranslations('common');
  const subscriptionId = useSelector(selectSubscriptionId);
  const customerId = useSelector(selectCustomerId);
  const email = useSelector(selectEmail);
  const emailAccount = useSelector(selectEmailAccount);
  const passwordAccount = useSelector(selectPasswordAccount);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!subscriptionId || !email) {
      router.push('/checkout');
    }
  }, [subscriptionId]);

  useEffect(() => {
    gaEventDispatch({ event: 'thank_you_page_show' });
  }, []);

  useEffect(() => {
    const fetchCreateAccount = async () => {
      try {
        setLoader(true);
        const response = await fetch('/back/auth/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-id': 'site',
          },
          body: JSON.stringify({
            email: trimEmail(email),
            subscriptionId,
            customerId,
            locale: router.locale,
            place: 'checkout',
          }),
        });

        const { data } = await response.json();
        const { email: userEmail, password: userPassword } = data || {};
        dispatch(setEmailAccount(trimEmail(userEmail ?? '')));
        dispatch(setPasswordAccount(userPassword));
        setLoader(false);
      } catch (error) {
        reportError({ error });
        setLoader(false);
      }
    };
    if (subscriptionId && email && !passwordAccount) {
      fetchCreateAccount();
    }
  }, [subscriptionId, email]);

  return (
    <section className={styles['aa']}>
      <div className={cn('wrapper', styles['aa__wrapper'])}>
        <div className={styles['status']}>
          <IconCheck className={styles['status__icon']} />
          <p className={styles['status__text']}>{t('status')}</p>
        </div>
        <div className={styles['aa__top']}>
          <h1 className={styles['aa__title']}>{t('title')}</h1>
          <p className={styles['aa__description']}>{t('description')}</p>
        </div>
        <div className={styles['account']}>
          <div className={styles['account__wrapper']}>
            <h1 className={styles['account__title']}>{t('account.title')}</h1>
            <div className={styles['account__content']}>
              {loader ? (
                <Loader />
              ) : (
                <>
                  <CopyData title={t('account.yourLogin')} data={emailAccount ?? ''} />
                  <CopyData title={t('account.yourPassword')} data={passwordAccount ?? ''} />
                </>
              )}
            </div>
            <div className={styles['manual']}>
              <h2 className={styles['manual__title-big']}>{t('manual.automaticallyTitle')}</h2>
              <p className={styles['manual__description-small']}>{t('manual.automaticallyText')}</p>
              <DownloadButtons />
              <p className={styles['manual__or']}>
                <span>{tCommon('or')}</span>
              </p>
              <h3 className={styles['manual__title']}>{t('manual.manuallyTitle')}</h3>
              <p className={styles['manual__description']}>{t('manual.manuallyText')}</p>
              <Image
                className={styles['manual__img']}
                alt="sent to inbox"
                width={312}
                height={104}
                src={'/images/checkout/sent-to-inbox.png'}
              />
              <p className={styles['manual__description']}>{t('manual.text')}</p>
              <Image
                className={styles['manual__img']}
                alt="log in"
                width={312}
                height={280}
                src={'/images/checkout/log-in.png'}
              />
            </div>
          </div>
        </div>
        <p className={styles['aa__terms']}>
          {t.rich('terms', {
            term: (chunks) => (
              <Link href="/terms-of-use" target="_blank">
                {chunks}
              </Link>
            ),
            privacy: (chunks) => (
              <Link href="/privacy-policy" target="_blank">
                {chunks}
              </Link>
            ),
            subscription: (chunks) => (
              <Link href="/subscription-terms" target="_blank">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </section>
  );
};

export default ActivateAccount;
