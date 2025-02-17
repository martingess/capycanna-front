import styles from './ProductCard.module.scss';
import Image from 'next/image';
import { ButtonCO, IconHard } from '@UI';
import { useTranslations } from 'next-intl';

const ProductCard = ({ product, t }) => {
  // const t = useTranslations('productItem');

  const {
    title,
    description,
    image,
    discount,
    isPopular,
    isNew,
    promotionEnd,
    price,
    oldPrice,
    stock,
  } = product;

  return (
    <div className={styles['card']}>
      <div className={styles['card__wrapper']}>
        <div className={styles['card__top']}>
          <Image
            src={typeof product?.image === 'object' ? image[0] : image}
            alt="product"
            width={207}
            height={207}
            className={styles['card__image']}
          />
          <div className={styles['card__label']}>
            <p className={styles['card__label-off']}>{discount}</p>
            {isPopular && <p className={styles['card__label-popular']}>Most popular</p>}
            {isNew && <p className={styles['card__label-new']}>New</p>}
          </div>
          <div className={styles['card__promotion']}>
            <p className={styles['card__promotion-text']}>
              end of the promotion: <span>{promotionEnd}</span>
            </p>
            <Image
              src="/images/promotion.png"
              alt="promotion"
              width={207}
              height={207}
              className={styles['card__promotion-bg']}
            />
          </div>
          <IconHard className={styles['card__favorite']} />
        </div>
        <div className={styles['card__content']}>
          <h3 className={styles['card__title']}>{title}</h3>
          <div className={styles['card__description']}>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles['card__bottom']}>
          <div className={styles['card__prices']}>
            <p className={styles['card__price']}>
              {price} <span>{t('withVat')}</span>
            </p>
            <p className={styles['card__old-price']}>{oldPrice}</p>
          </div>
          <p className={styles['card__stock']}>{stock}</p>
        </div>
        <ButtonCO className={styles['card__button']}>{t('inCart')}</ButtonCO>
      </div>
    </div>
  );
};

export default ProductCard;
