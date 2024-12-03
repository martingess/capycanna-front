import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
import Link from 'next/link';
import { IconPdf } from '@UI';
import styles from './AboutUs.module.scss';
import Features from '@components/Features';

const AboutUs = () => {
  const t = useTranslations('aboutUs');

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['analysis']}>
        <div className={styles['analysis__wrapper']}>
          <Breadcrumbs />
          <h1 className={styles['analysis__title']}>{t('title')}</h1>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
