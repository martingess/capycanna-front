import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslations } from 'next-intl';
import { IconStar } from '@UI';
import styles from './Reviews.module.scss';
import Image from 'next/image';
import cn from 'classnames';

export default function Reviews({ translation }) {
  const t = useTranslations(translation || 'home');
  const [isSwiperEnabled, setIsSwiperEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const reviewsList = Array.isArray(t.raw('reviews.list')) ? t.raw('reviews.list') : [];
  const swiperRef = useRef(null);

  const half = Math.ceil(reviewsList.length / 2);
  const column1 = reviewsList.slice(0, half);
  const column2 = reviewsList.slice(half);

  useEffect(() => {
    const handleResize = () => {
      setIsSwiperEnabled(window.innerWidth < 960);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const staticSlides = (
    <>
      <div className={styles['reviews__slider-line']}>
        {column1.map((review, index) => (
          <div
            key={review.name}
            className={`${styles['static-slide']} ${index === activeIndex ? styles['active'] : ''}`}
          >
            <div className={styles['reviews__slide']}>
              <div className={styles['reviews__slide_header']}>
                <div className={styles['reviews__slide_avatar']}>
                  <Image
                    width={60}
                    height={60}
                    src={review.image}
                    alt={`${review.name}'s avatar`}
                  />
                </div>
                <div className={styles['reviews__slide_info']}>
                  <h3 className={styles['reviews__slide_name']}>{review.name}</h3>
                  <div className={styles['reviews__slide_rait']}>
                    <span>{review.stars}</span>
                    <div className={styles['reviews__slide_stars']}>
                      <IconStar />
                      <IconStar />
                      <IconStar />
                      <IconStar />
                      <IconStar />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={styles['reviews__content']}
                dangerouslySetInnerHTML={{ __html: review.review }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles['reviews__slider-line']}>
        {column2.map((review, index) => (
          <div
            key={review.name}
            className={`${styles['static-slide']} ${index === activeIndex ? styles['active'] : ''}`}
          >
            <div className={styles['reviews__slide']}>
              <div className={styles['reviews__slide_header']}>
                <div className={styles['reviews__slide_avatar']}>
                  <Image
                    width={60}
                    height={60}
                    src={review.image}
                    alt={`${review.name}'s avatar`}
                  />
                </div>
                <div className={styles['reviews__slide_info']}>
                  <h3 className={styles['reviews__slide_name']}>{review.name}</h3>
                  <div className={styles['reviews__slide_rait']}>
                    <span>{review.stars}</span>
                    <div className={styles['reviews__slide_stars']}>
                      <IconStar />
                      <IconStar />
                      <IconStar />
                      <IconStar />
                      <IconStar />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={styles['reviews__content']}
                dangerouslySetInnerHTML={{ __html: review.review }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <section className={cn(styles.reviews, 'reviews')}>
      <div className={styles['reviews__wrapper']}>
        <div className={styles['reviews__content']}>
          <h3 className={styles['reviews__title']}>{t('reviews.title')}</h3>
          <p className={styles['reviews__description']}>{t('reviews.description')}</p>
        </div>
        <div className={styles['reviews__slider']}>
          {isSwiperEnabled ? (
            <>
              <Swiper
                spaceBetween={14}
                ref={swiperRef}
                slidesPerView={1.2}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className={styles['swiper']}
                breakpoints={{
                  650: {
                    slidesPerView: 2.2,
                    spaceBetween: 24,
                  },
                  860: {
                    slidesPerView: 3.2,
                    spaceBetween: 24,
                  },
                }}
              >
                {reviewsList.map((review) => (
                  <SwiperSlide key={review.name} className={styles['swiper__slide']}>
                    <div className={styles['reviews__slide']}>
                      <div className={styles['reviews__slide_header']}>
                        <div className={styles['reviews__slide_avatar']}>
                          <Image
                            width={60}
                            height={60}
                            src={review.image}
                            alt={`${review.name}'s avatar`}
                          />
                        </div>
                        <div className={styles['reviews__slide_info']}>
                          <h3 className={styles['reviews__slide_name']}>{review.name}</h3>
                          <div className={styles['reviews__slide_rait']}>
                            <span>{review.stars}</span>
                            <div className={styles['reviews__slide_stars']}>
                              <IconStar />
                              <IconStar />
                              <IconStar />
                              <IconStar />
                              <IconStar />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles['reviews__content']}
                        dangerouslySetInnerHTML={{ __html: review.review }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            staticSlides
          )}
          <div className={styles['custom-pagination']}>
            {reviewsList.map((_, index) => (
              <button
                key={index}
                className={`${styles['pagination-bullet']} ${activeIndex === index ? styles['active'] : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
