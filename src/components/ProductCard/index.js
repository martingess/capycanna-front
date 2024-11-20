import styles from './ProductCard.module.scss';
import Image from 'next/image';
import { ButtonCO, IconHard } from '@UI';

const ProductCard = ({ product }) => {
  const { title, description, image } = product;
  return (
    <div className={styles['card']}>
      <div className={styles['card__wrapper']}>
        <div className={styles['card__image']}>
          <Image src={product.image} alt={product.title} width={207} height={207} />
          <div className={styles['card__label']}>
            <p className={styles['card__label-off']}>-30% off</p>
            <p className={styles['card__label-popular']}>Most popular</p>
            <p className={styles['card__label-new']}>New</p>
          </div>
          <div className={styles['card__promotion']}>
            <p className={styles['card__promotion-text']}>
              end of the promotion: <span>05:00</span>
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
          <h3 className={styles['card__title']}>{product.title}</h3>
          <p className={styles['card__description']}>{product.description}</p>
        </div>
        <div className={styles['card__bottom']}>
          <div className={styles['card__prices']}>
            <p className={styles['card__price']}>
              5,95 € <span>(with VAT)</span>
            </p>
            <p className={styles['card__old-price']}>8,50 €</p>
          </div>
          <p className={styles['card__stock']}>In stock</p>
        </div>
        <ButtonCO className={styles['card__button']}>In the cart</ButtonCO>
      </div>
    </div>
  );
};

export default ProductCard;
