import Head from 'next/head';
import { useTranslations } from 'next-intl';
import FaqSection from '@components/FaqSection';
import Categories from '@components/Categories';
import Reviews from '@components/Reviews';
import Chips from '@components/Chips';
import Features from '@components/Features';
import Step from '@components/Step';
import TopSlider from '@components/TopSlider';
import ProductsSlider from '@components/ProductsSlider';
import { mockProducts } from '../../data/mockProducts';

const HomePage = () => {
  const t = useTranslations('home');

  console.log('mockProducts', mockProducts);

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <TopSlider translation={'home'} />
      <Features translation={'common'} />
      <Categories translation={'home'} />
      <ProductsSlider translation={t} products={mockProducts} place="stars" />
      <Chips translation={'home'} />
      <ProductsSlider translation={t} products={mockProducts} place="discounted" noBg />
      <Step translation={'home'} />
      <Reviews translation={'home'} />
      <FaqSection translation={'home'} />
    </>
  );
};

export default HomePage;
