import Head from 'next/head';
import { useTranslations } from 'next-intl';
import FaqSection from '@components/FaqSection';
import Categories from '@components/Categories';
import Reviews from '@components/Reviews';
import Chips from '@components/Chips';
import Features from '@components/Features';
import Step from '@components/Step';
import TopSlider from '@components/TopSlider';

const HomePage = () => {
  const t = useTranslations('home');

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <TopSlider translation={'home'} />
      <Features translation={'home'} />
      <Categories translation={'home'} />
      <Chips translation={'home'} />
      <Step translation={'home'} />
      <Reviews translation={'home'} />
      <FaqSection translation={'home'} />
    </>
  );
};

export default HomePage;
