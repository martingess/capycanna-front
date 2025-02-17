import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ProductImages.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderArrow } from '@components/UI/SliderArrow';

const ProductImagesModal = ({ isOpen, onClose, images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleNext = () => {
    if (activeIndex === images?.length - 1) {
      swiperRef.current?.swiper.slideTo(0);
    } else {
      swiperRef.current?.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (activeIndex === 0) {
      swiperRef.current?.swiper.slideTo(images?.length - 1);
    } else {
      swiperRef.current?.swiper.slidePrev();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles['overlay']}>
      <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className={styles['swiper']}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {images?.map((imageItem, index) => (
            <SwiperSlide key={index} className={styles['product__slide']}>
              <Image
                src={imageItem}
                width={620}
                height={500}
                className={styles['product__image']}
                alt="product-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles['pagination-wrapper']}>
          <Image
            src="/images/productItem/image-modal-arrow.svg"
            alt="prev"
            onClick={handlePrev}
            width={50}
            height={50}
            className={styles['pagination-arrow-left']}
          />
          <div className={styles['pagination']}>
            {Array.from({ length: images?.length }, (_, index) => (
              <button
                key={index}
                className={`${styles['pagination-bullet']} ${activeIndex === index ? styles['active'] : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <Image
            src="/images/productItem/image-modal-arrow.svg"
            alt="next"
            onClick={handleNext}
            width={50}
            height={50}
            className={styles['pagination-arrow-right']}
          />
        </div>
      </div>
      <div className={styles['close-btn-wrapper']}>
        <Image
          src="/images/productItem/image-modal-close.svg"
          alt="close"
          onClick={onClose}
          width={32}
          height={32}
          className={styles['close-btn']}
        />
      </div>
    </div>
  );
};

export default ProductImagesModal;
