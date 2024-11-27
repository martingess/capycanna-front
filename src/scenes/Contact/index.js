import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
import styles from './Contact.module.scss';

const Contact = () => {
  const t = useTranslations('contact');
  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['contact']}>
        <div className={styles['contact__wrapper']}>
          <Breadcrumbs />
        </div>
      </section>
    </>
  );
};

export default Contact;
