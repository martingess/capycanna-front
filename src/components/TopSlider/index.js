import Image from 'next/image';
import styles from './TopSlider.module.scss';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { IconBuy } from '@UI';
import { useState, useRef, useCallback } from 'react';

const BuyButton = () => {
  return (
    <div className={styles['buy']}>
      <IconBuy className={styles['buy__image']} />
      <Image
        className={styles['buy__frame']}
        width={125}
        height={125}
        src="/images/home/buy-frame.svg"
        alt={'but-frame'}
      />
      <Link href={'/products'} className={styles['buy__link']} />
    </div>
  );
};

const TopSlider = ({ translation }) => {
  const t = useTranslations(translation || 'home');
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderList = Array.isArray(t.raw('topSlider.list')) ? t.raw('topSlider.list') : [];
  const swiperRef = useRef(null);

  const sliderDelay = 4000;
  const sliderDelayOnInteraction = 8000;

  const handleSliderClick = useCallback(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.autoplay.stop();
      setTimeout(() => {
        swiperInstance.autoplay.start();
      }, sliderDelayOnInteraction);
    }
  }, []);

  const goToSlide = (index) => {
    setActiveIndex(index);
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.slideTo(index);
      handleSliderClick();
    }
  };

  const handleNext = () => {
    if (activeIndex === sliderList.length - 1) {
      swiperRef.current?.swiper.slideTo(0);
    } else {
      swiperRef.current?.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (activeIndex === 0) {
      swiperRef.current?.swiper.slideTo(sliderList.length - 1);
    } else {
      swiperRef.current?.swiper.slidePrev();
    }
  };

  return (
    <div className={styles['slider']} onClick={handleSliderClick}>
      <div className={styles['slider__wrapper']}>
        <Swiper
          spaceBetween={0}
          ref={swiperRef}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{
            delay: sliderDelay,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className={styles['swiper']}
        >
          {sliderList.map(({ title, text, img }, item) => (
            <SwiperSlide key={item} className={styles['products__slide']}>
              <div className={styles['products__slide-wrap']}>
                <div className={styles['products__slide-content']}>
                  <div
                    className={styles['products__slide-title']}
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <div
                    className={styles['products__slide-text']}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </div>
                <div className={styles['products__slide-img']}>
                  <Image width={1920} height={860} src={img} alt={'product-slider'} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles['custom-pagination-wrapper']}>
          <button
            onClick={handlePrev}
            className={`${styles['arrow-wrapper']} ${styles['arrow__left']}`}
          >
            <Image src="/icons/slider-arrow.svg" alt="slider-arrow" width={40} height={40} />
          </button>
          <div className={styles['custom-pagination']}>
            {sliderList.map((_, index) => (
              <button
                key={index}
                className={`${styles['pagination-bullet']} ${activeIndex === index ? styles['active'] : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className={`${styles['arrow-wrapper']} ${styles['arrow__right']}`}
          >
            <Image src="/icons/slider-arrow.svg" alt="slider-arrow" width={40} height={40} />
          </button>
        </div>
        <BuyButton />
      </div>
      <Image
        className={styles['slider__bg']}
        width={1920}
        height={860}
        src={'/images/home/bg.png'}
        alt="bg"
      />
    </div>
  );
};

export default TopSlider;
