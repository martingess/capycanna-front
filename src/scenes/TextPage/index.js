import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
import styles from './TextPage.module.scss';

const TextPage = ({ translation }) => {
  const t = useTranslations(translation);
  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['text']}>
        <div className={styles['text__wrapper']}>
          <Breadcrumbs />
          <div
            className={styles['text__content']}
            dangerouslySetInnerHTML={{ __html: t.raw('content') }}
          />
        </div>
      </section>
    </>
  );
};

export default TextPage;
