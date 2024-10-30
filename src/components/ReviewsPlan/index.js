import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './ReviewsPlan.module.scss';

const ReviewsPlan = ({ translations }) => {
  const t = useTranslations(translations);
  const reviewList = Array.isArray(t.raw('items')) ? t.raw('items') : [];

  return (
    <div className={styles['review']}>
      <h5 className={styles['review_title']}>{t('title')}</h5>
      <p
        className={styles['review_caption']}
        dangerouslySetInnerHTML={{ __html: t.raw('description') }}
      />
      <div className={styles['review_list']}>
        {reviewList.map(({ img, name, time, review }, index) => (
          <div key={`${name}-${index}`} className={styles['review_elem']}>
            <div className={styles['review_elem-top']}>
              <Image
                className={styles['review_elem-avatar']}
                src={img}
                alt={'customer image'}
                width={40}
                height={40}
                quality={100}
              />
              <div className={styles['review_elem-caption']}>
                <p>{name}</p>
                <span>{time}</span>
              </div>
              <Image
                src="/images/checkout/plan-rate-review.svg"
                alt="star"
                width={80}
                height={16}
                quality={100}
              />
            </div>
            <div
              className={styles['review_elem-text']}
              dangerouslySetInnerHTML={{ __html: review }}
            />
          </div>
        ))}
      </div>
      <Image
        className={styles['review_rate']}
        src={`/images/checkout/plan-rate.svg`}
        width={212}
        height={76}
        quality={100}
        alt="26K reviews"
      />
    </div>
  );
};

export default ReviewsPlan;
