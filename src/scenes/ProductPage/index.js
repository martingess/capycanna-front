import { useTranslations } from 'next-intl';
import Head from 'next/head';
import styles from './ProductItem.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { TabItem, ButtonCO, ProductCount, IconHard } from '@UI';
import ProductsSlider from '@components/ProductsSlider';
import { mockProducts } from '../../data/mockProducts';
import ProductSpecsTabs from '@components/ProductSpecsTabs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderArrow } from '@components/UI/SliderArrow';
import ProductImagesModal from '../../components/Modals/ProductImages';

export const starsRate = [
  {
    id: 1,
    fill: 100,
  },
  {
    id: 2,
    fill: 100,
  },
  {
    id: 3,
    fill: 100,
  },
  {
    id: 4,
    fill: 100,
  },
  {
    id: 5,
    fill: 100,
  },
];

const hhcMockData = [
  {
    id: 1,
    title: '30%',
  },
  {
    id: 2,
    title: '50%',
  },
  {
    id: 3,
    title: '70%',
  },
];

const varietyMockData = [
  {
    id: 1,
    title: 'Blueberry',
  },
  {
    id: 2,
    title: 'Lemon Haze',
  },
  {
    id: 3,
    title: 'Tropical Kush',
  },
  {
    id: 4,
    title: 'Strawberry Haze',
  },
];

const ProductItem = ({ product }) => {
  const t = useTranslations('productItem');

  const [hhc, setHhc] = useState(hhcMockData[0]);
  const [variety, setVariety] = useState(varietyMockData[0]);
  const [orderCount, setOrderCount] = useState(1);

  const mainInfo = (inlineStyles) => {
    return (
      <div style={inlineStyles} className={styles['info-main']}>
        <div className={styles['warnings']}>
          <Image src="/images/productItem/no-smoke.svg" alt="warning" width={24} height={24} />
          <Image src="/images/productItem/18+.svg" alt="warning" width={24} height={24} />
          <Image src="/images/productItem/no-kids.svg" alt="warning" width={24} height={24} />
        </div>
        <div className={styles['rating']}>
          {starsRate.map((star) => (
            <Image
              key={star.id}
              src={
                star.fill === 100
                  ? '/images/productItem/star-rate-fill.svg'
                  : '/images/productItem/star-rate-fill.svg'
              }
              alt="rate-star"
              width={24}
              height={24}
            />
          ))}
        </div>
        <div className={styles['subtitle']} style={{ marginTop: 0 }}>
          {t('code')} {product?.id}
        </div>
      </div>
    );
  };

  // image slider logic
  const isImagesSlider = typeof product?.image === 'object';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleNext = () => {
    if (activeIndex === product?.image?.length - 1) {
      swiperRef.current?.swiper.slideTo(0);
    } else {
      swiperRef.current?.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (activeIndex === 0) {
      swiperRef.current?.swiper.slideTo(product?.image?.length - 1);
    } else {
      swiperRef.current?.swiper.slidePrev();
    }
  };

  const ImageLabels = (product) => {
    return (
      <>
        <div className={styles['card__label']}>
          <p className={styles['card__label-off']}>{product?.discount}</p>
          {product?.isPopular && (
            <p className={styles['card__label-popular']}>{t('mostPopular')}</p>
          )}
          {product?.isNew && <p className={styles['card__label-new']}>{t('new')}</p>}
        </div>
        <div className={styles['card__promotion']}>
          <p className={styles['card__promotion-text']}>
            {t('promotionEnd')} <span>{product?.promotionEnd}</span>
          </p>
          <Image
            src="/images/promotion.png"
            alt="promotion"
            width={207}
            height={207}
            className={styles['card__promotion-bg']}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>
          {t('metaTitle')}
          {product?.title}
        </title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['product']}>
        <Breadcrumbs productTitle={product?.title} />
        <div className={styles['product__content']}>
          <div className={styles['info-main-wrapper-mob']}>{mainInfo()}</div>
          <div className={styles['product__image-wrapper']}>
            <div className={styles['product__image']}>
              {isImagesSlider ? (
                <>
                  <Swiper
                    spaceBetween={14}
                    ref={swiperRef}
                    slidesPerView={1}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className={styles['swiper']}
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    {product?.image?.map((imageItem, index) => (
                      <SwiperSlide key={index} className={styles['products__slide']}>
                        <Image src={imageItem} width={550} height={500} alt="product-image" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className={styles['custom-pagination-wrapper']}>
                    <SliderArrow onClick={handlePrev} style={{ left: '8px', top: '45%' }} />
                    <div className={styles['custom-pagination']}>
                      {Array.from({ length: product?.image?.length }, (_, index) => (
                        <button
                          key={index}
                          className={`${styles['pagination-bullet']} ${activeIndex === index ? styles['active'] : ''}`}
                          onClick={() => goToSlide(index)}
                        />
                      ))}
                    </div>
                    <SliderArrow
                      onClick={handleNext}
                      style={{ right: '8px', top: '45%' }}
                      isRight
                    />
                  </div>
                </>
              ) : (
                <Image src={product?.image} width={550} height={500} alt="product-image" />
              )}
              {ImageLabels(product)}
            </div>
            {isImagesSlider && (
              <div className={styles['product__image-list']}>
                {product?.image?.map((imageItem, index) => (
                  <Image
                    onClick={() => goToSlide(index)}
                    style={{ border: activeIndex === index ? '1px solid #8CB869' : 'none' }}
                    key={index}
                    className={styles['image-list__item']}
                    src={imageItem}
                    width={100}
                    height={86}
                    alt="product-image"
                  />
                ))}
              </div>
            )}
          </div>
          <div className={styles['product__info']}>
            <div className={styles['top-info']}>
              <div className={styles['info-main-wrapper-desk']}>{mainInfo()}</div>
              <div className={styles['info-stock']}>
                {product?.stock ? t('inStock') : t('outOfStock')}
              </div>
            </div>
            <h1 className={styles['product__title']}>{product?.title}</h1>
            <div className={styles['product__price']}>
              <p className={styles['subtitle']}>{t('price')}</p>
              <div className={styles['price-body']}>
                <p className={styles['price-new']}>{product?.price}</p>
                <p className={styles['subtitle']} style={{ marginTop: 0 }}>
                  {t('withVat')}
                </p>
                <p className={styles['price-old']}>{product?.oldPrice}</p>
              </div>
            </div>
            <div className={styles['product__hhc']}>
              <p className={styles['subtitle']}>{t('hhc')}</p>
              <div className={styles['tabs-wrapper']}>
                {hhcMockData.map((item) => (
                  <TabItem
                    key={item?.id}
                    value={item?.title}
                    onClick={() => setHhc(item)}
                    isActive={item?.title === hhc?.title}
                  />
                ))}
              </div>
            </div>
            <div className={styles['product__variety']}>
              <p className={styles['subtitle']}>{t('variety')}</p>
              <div className={styles['tabs-wrapper']}>
                {varietyMockData.map((item) => (
                  <TabItem
                    key={item?.id}
                    value={item?.title}
                    onClick={() => setVariety(item)}
                    isActive={item?.title === variety?.title}
                  />
                ))}
              </div>
            </div>
            <div className={styles['product__order']}>
              <ProductCount
                value={orderCount}
                onIncrement={() => setOrderCount((prev) => prev + 1)}
                onDecrement={() => setOrderCount((prev) => (prev > 1 ? prev - 1 : 1))}
              />
              <ButtonCO
                theme="orange"
                className={styles['cart-button']}
                onClick={() => console.log('to the cart')}
              >
                {t('inCart')}
              </ButtonCO>
              <IconHard className={styles['like']} />
            </div>
            <div className={styles['text__content']}>
              <Image
                src="/images/productItem/order-symbol.svg"
                alt="order-symbol"
                width={30}
                height={30}
              />
              <p>{t('shippingInfo')}</p>
            </div>
            <div className={styles['text__content']}>
              <Image src="/images/productItem/shipping.svg" alt="shipping" width={30} height={30} />
              <p>
                {t('freeShipping1')}
                <span>{t('freeShipping2')}</span>
              </p>
            </div>
          </div>
        </div>
        <ProductSpecsTabs t={t} />
        <ProductsSlider
          translation={t}
          products={mockProducts}
          place="productsSlider"
          noBg
          noSubTitle
          noMoreBtn
        />
      </section>
      <ProductImagesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={product?.image}
      />
    </>
  );
};

export default ProductItem;
