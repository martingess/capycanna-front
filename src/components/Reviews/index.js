import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslations } from 'next-intl';
import styles from './Reviews.module.scss';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { Pagination } from 'swiper/modules';

const testimonials = [
  {
    name: 'Marfa Muratova1',
    rating: 5,
    date: '02.11.2023',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    avatar: '/path-to-avatar.jpg',
  },
  {
    name: 'Marfa Muratova2',
    rating: 5,
    date: '02.11.2023',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    avatar: '/path-to-avatar.jpg',
  },
  {
    name: 'Marfa Muratova3',
    rating: 5,
    date: '02.11.2023',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    avatar: '/path-to-avatar.jpg',
  },
  {
    name: 'Marfa Muratova4',
    rating: 5,
    date: '02.11.2023',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    avatar: '/path-to-avatar.jpg',
  },
  {
    name: 'Marfa Muratova5',
    rating: 5,
    date: '02.11.2023',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    avatar: '/path-to-avatar.jpg',
  },
];

export default function Reviews({ translation }) {
  const t = useTranslations(translation || 'home');

  const reviewsList = Array.isArray(t.raw('reviews.list')) ? t.raw('reviews.list') : [];

  return (
    <section className={styles.reviews}>
      <div className={styles['reviews__wrapper']}>
        <div className={styles['reviews__content']}>
          <h3 className={styles['reviews__title']}>{t('reviews.title')}</h3>
          <p className={styles['reviews__description']}>{t('reviews.description')}</p>
        </div>
        <div className={styles['reviews__slider']}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className={styles['swiper']}
            slidesPerView={1}
            // breakpoints={{
            //   768: {
            //     slidesPerView: 2, // На планшетах показываем 2 слайда
            //     spaceBetween: 24,
            //   },
            //   1024: {
            //     slidesPerView: 3, // На десктопе показываем 3 слайда
            //     spaceBetween: 32,
            //   },
            // }}
          >
            {reviewsList.map((review) => (
              <SwiperSlide key={review.name} className={styles['swiper__slide']}>
                <div className={styles['reviews__slide']}>
                  <div className={styles['reviews__slide_header']}>
                    <img
                      src={review.image}
                      alt={`${review.name}'s avatar`}
                      className={styles['reviews__slide_avatar']}
                    />
                    <div className={styles['reviews__slide_info']}>
                      <h3>{review.name}</h3>
                      <p>{review.stars} ⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                  <div
                    className={styles['reviews__content']}
                    dangerouslySetInnerHTML={{ __html: review.review }}
                  />
                  <p className={styles['reviews__date']}>{review.date}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
