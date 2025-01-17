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
import 'swiper/scss';

const HomePage = () => {
  const t = useTranslations('home');

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <TopSlider translation={'home'} />
      <Features translation={'common'} />
      <Categories translation={'home'} />
      <ProductsSlider translation={'home'} products={[1, 2, 3, 4, 5]} place="stars" />
      <Chips translation={'home'} />
      <ProductsSlider
        translation={'home'}
        products={[1, 2, 3, 4, 5]}
        place="discounted"
        noBg={true}
      />
      <Step translation={'home'} />
      <Reviews translation={'home'} />
      <FaqSection translation={'home'} />
    </>
  );
};

export default HomePage;
