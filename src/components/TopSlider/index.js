import Image from 'next/image';
import styles from './TopSlider.module.scss';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useRef } from 'react';

const TopSlider = ({ translation }) => {
  const t = useTranslations(translation || 'home');
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderList = Array.isArray(t.raw('topSlider.list')) ? t.raw('topSlider.list') : [];
  const swiperRef = useRef(null);
  const goToSlide = (index) => {
    setActiveIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className={styles['slider']}>
      <div className={styles['slider__wrapper']}>
        <Swiper
          spaceBetween={0}
          ref={swiperRef}
          slidesPerView={1}
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
        <div className={styles['custom-pagination']}>
          {sliderList.map((_, index) => (
            <button
              key={index}
              className={`${styles['pagination-bullet']} ${activeIndex === index ? styles['active'] : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
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
