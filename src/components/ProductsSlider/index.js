import ProductCard from '@components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';

import styles from './ProductsSlider.module.scss';
const ProductsSlider = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const goToSlide = (index) => {
    setActiveIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const list = [1, 2, 3, 4, 5, 6, 7, 9];
  return (
    <div className={styles['products']}>
      <div className={styles['products__wrapper']}>
        <h2 className={styles['products__title']}>New stars</h2>
        <div className={styles['products__items']}>
          <Swiper
            spaceBetween={14}
            ref={swiperRef}
            slidesPerView={1.25}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className={styles['swiper']}
            breakpoints={{
              450: {
                slidesPerView: 1.6,
              },
              590: {
                slidesPerView: 2.2,
              },
              780: {
                slidesPerView: 3.2,
              },
              960: {
                slidesPerView: 3.6,
              },
              1100: {
                slidesPerView: 4,
              },
            }}
          >
            {list.map((item) => (
              <SwiperSlide key={item} className={styles['products__slide']}>
                <ProductCard product={{}} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles['custom-pagination']}>
            {list.map((_, index) => (
              <button
                key={index}
                className={`${styles['pagination-bullet']} ${activeIndex === index ? styles['active'] : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
        <Link href="/products" className={styles['products__link']}>
          View all products
        </Link>
      </div>
      <Image
        src={'/images/products/bg.png'}
        width={1918}
        height={938}
        alt="products-bg"
        className={styles['products__bg']}
      />
    </div>
  );
};

export default ProductsSlider;
