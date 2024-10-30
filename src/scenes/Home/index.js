import Head from 'next/head';
import { useTranslations } from 'next-intl';
import TopSection from '@components/TopSection';

const HomePage = () => {
  const t = useTranslations('home');

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <TopSection trans="home" />
    </>
  );
};

export default HomePage;