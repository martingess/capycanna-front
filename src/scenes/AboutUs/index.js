import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
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
      <section className={styles['about']}>
        <div className={styles['about__wrapper']}>
          <Breadcrumbs />
          <h1 className={styles['about__title']}>{t('title')}</h1>
          <div
            className={styles['about__text']}
            dangerouslySetInnerHTML={{ __html: t.raw('text.top') }}
          />
          <Features translation={'aboutUs'} />
        </div>
      </section>
    </>
  );
};

export default AboutUs;
