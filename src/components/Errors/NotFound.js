import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { Button } from '@UI';
import cn from 'classnames';
import styles from './Errors.module.scss';
import Image from 'next/image';

export const NotFound = () => {
  const t = useTranslations('notFound');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <section className={styles['error-404']}>
        <div className={styles['error-404__wrapper']}>
          <h2 className={styles['error-404__main']}>404</h2>
          <h2 className={styles['error-404__headline']}>{t('pageNotFound')}</h2>
          <p className={styles['error-404__text']}>{t('errorHasOccurred')}</p>
          <Button
            theme="orange-border-shadow"
            className={styles['error-404__button']}
            aria-label={t('toHomePage')}
            href="/"
          >
            {t('toHomePage')}
          </Button>
        </div>
        <Image
          className={styles['error-404__bg-left']}
          src={'/images/404-left.png'}
          alt="404-left"
          width={580}
          height={618}
        />
        <Image
          className={styles['error-404__bg-right']}
          src={'/images/404-right.png'}
          alt="404-right"
          width={580}
          height={618}
        />
      </section>
    </>
  );
};
