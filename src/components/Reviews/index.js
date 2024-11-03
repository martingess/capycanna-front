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
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.name} className={styles['swiper__slide']}>
                <div className={styles['reviews__slide']}>
                  <div className={styles['reviews__slide_header']}>
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name}'s avatar`}
                      className={styles['reviews__slide_avatar']}
                    />
                    <div className={styles['reviews__slide_info']}>
                      <h3>{testimonial.name}</h3>
                      <p>5/5 ⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                  <p className={styles['reviews__content']}>{testimonial.content}</p>
                  <p className={styles['reviews__date']}>{testimonial.date}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
