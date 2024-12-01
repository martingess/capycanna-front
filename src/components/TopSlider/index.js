import Image from 'next/image';
import styles from './TopSlider.module.scss';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { IconBuy } from '@UI';
import { useState, useRef } from 'react';

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
      <Link href={'/'} className={styles['buy__link']} />
    </div>
  );
};

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
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
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
        <div className={styles['custom-pagination']}>
          {sliderList.map((_, index) => (
            <button
              key={index}
              className={`${styles['pagination-bullet']} ${activeIndex === index ? styles['active'] : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
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
