import ProductCard from '@components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';
import { SliderArrow } from '@components/UI/SliderArrow';
import { useEffect } from 'react';

import styles from './ProductsSlider.module.scss';
const ProductsSlider = ({ products = [1, 2, 3, 4], place, translation, noBg = false }) => {
  const t = useTranslations(translation ?? 'home');
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1.25);
  const swiperRef = useRef(null);

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleNext = () => {
    if (activeIndex === products.length - 1) {
      swiperRef.current?.swiper.slideTo(0);
    } else {
      swiperRef.current?.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (activeIndex === 0) {
      swiperRef.current?.swiper.slideTo(products.length - 1);
    } else {
      swiperRef.current?.swiper.slidePrev();
    }
  };

  const getTotalPages = () => {
    return Math.ceil(products.length / slidesPerView);
  };

  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1100) setSlidesPerView(4);
      else if (width >= 960) setSlidesPerView(3.6);
      else if (width >= 780) setSlidesPerView(3.2);
      else if (width >= 590) setSlidesPerView(2.2);
      else if (width >= 450) setSlidesPerView(1.6);
      else setSlidesPerView(1.25);
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  return (
    <div className={styles['products']}>
      <div className={styles['products__wrapper']}>
        <h2 className={styles['products__title']}>{t(`${place}.title`)}</h2>
        <div className={styles['products__items']}>
          <Swiper
            spaceBetween={14}
            ref={swiperRef}
            slidesPerView={slidesPerView}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className={styles['swiper']}
          >
            {products.map((item) => (
              <SwiperSlide key={item} className={styles['products__slide']}>
                <ProductCard product={{}} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles['custom-pagination-wrapper']}>
            <SliderArrow onClick={handlePrev} />
            <div className={styles['custom-pagination']}>
              {Array.from({ length: getTotalPages() }, (_, index) => (
                <button
                  key={index}
                  className={`${styles['pagination-bullet']} ${activeIndex === index ? styles['active'] : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <SliderArrow onClick={handleNext} isRight />
          </div>
        </div>
        <Link href={t(`${place}.more.link`)} className={styles['products__link']}>
          {t(`${place}.more.text`)}
        </Link>
      </div>
      {noBg ? null : (
        <Image
          src={'/images/products/bg.png'}
          width={1918}
          height={938}
          alt="products-bg"
          className={styles['products__bg']}
        />
      )}
    </div>
  );
};

export default ProductsSlider;
