import Head from 'next/head';
import { useTranslations } from 'next-intl';
import FaqSection from '@components/FaqSection';

const HomePage = () => {
  const t = useTranslations('home');

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <FaqSection translation={'home'} />
    </>
  );
};

export default HomePage;
