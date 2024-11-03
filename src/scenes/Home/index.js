import Head from 'next/head';
import { useTranslations } from 'next-intl';
import FaqSection from '@components/FaqSection';
import Reviews from '@components/Reviews';

const HomePage = () => {
  const t = useTranslations('home');

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <Reviews translation={'home'} />
      <FaqSection translation={'home'} />
    </>
  );
};

export default HomePage;
