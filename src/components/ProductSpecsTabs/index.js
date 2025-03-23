import { useState, useEffect } from 'react';
import { ButtonCO } from '@UI';
import styles from './ProductSpecsTabs.module.scss';
import Image from 'next/image';
import { starsRate } from '../../scenes/ProductPage';
import AddReviewModal from '../Modals/AddReview';
import MainTabs from '../MainTabs';

const charsMockData = [
  {
    id: 1,
    title: 'THC',
    value: '30%',
  },
  {
    id: 2,
    title: 'CBD',
    value: '50%',
  },
  {
    id: 3,
    title: 'CBN',
    value: '70%',
  },
  {
    id: 4,
    title: 'THC',
    value: '30%',
  },
  {
    id: 5,
    title: 'CBD',
    value: '50%',
  },
  {
    id: 6,
    title: 'CBN',
    value: '70%',
  },
  {
    id: 7,
    title: 'CBD',
    value: '50%',
  },
  {
    id: 8,
    title: 'CBN',
    value: '70%',
  },
];

const mockedCommentsData = [
  {
    id: 1,
    rate: 5,
    name: 'John Doe',
    image: '/images/productItem/mocked-avatar.png',
    photos: [
      '/images/productItem/mocked-review-img.png',
      '/images/productItem/mocked-review-img.png',
    ],
    date: '12.12.2021',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc nec nisl tincidunt aliquam',
  },
  {
    id: 2,
    rate: 5,
    name: 'John Doe 2',
    image: '/images/productItem/mocked-avatar.png',
    photos: [],
    date: '12.12.2021',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc nec nisl tincidunt aliquam',
  },
  {
    id: 3,
    rate: 5,
    name: 'John Doe 3',
    image: '/images/productItem/mocked-avatar.png',
    photos: [],
    date: '12.12.2021',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc nec nisl tincidunt aliquam',
  },
];

const ProductSpecsTabs = ({ t }) => {
  const [activeTab, setActiveTab] = useState('characteristics');
  const [isCharsOpened, setIsCharsOpened] = useState(false);
  const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReview = () => {
    console.log('Add review');
  };

  const isTabActive = (tab) => activeTab === tab;
  return (
    <div className={styles['tabs__wrapper']}>
      <MainTabs
        t={t}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tab1={<p>{t('specsTabs.header.characteristics')}</p>}
        tab2={<p>{t('specsTabs.header.description')}</p>}
        tab3={
          <p>
            {t('specsTabs.header.reviews')} ({mockedCommentsData?.length})
          </p>
        }
      />
      {isTabActive('characteristics') && (
        <>
          <div
            className={
              isCharsOpened
                ? `${styles['characteristics__body']} ${styles['characteristics__body-opened']}`
                : styles['characteristics__body']
            }
          >
            {charsMockData.map((char) => (
              <div key={char?.id} className={styles['characteristic__item']}>
                <div className={styles['characteristic__item-key']}>{char?.title}</div>
                <div className={styles['characteristic__item-dots']}></div>
                <div className={styles['characteristic__item-key']}>{char?.value}</div>
              </div>
            ))}
          </div>
          <button className={styles['view-btn']} onClick={() => setIsCharsOpened(!isCharsOpened)}>
            {isCharsOpened ? t('specsTabs.buttons.hide') : t('specsTabs.buttons.viewAll')}
            <Image
              src="/images/productItem/view-all-btn.svg"
              alt="order-symbol"
              style={{ transform: isCharsOpened ? 'rotate(180deg)' : 'rotate(0deg)' }}
              width={14}
              height={14}
            />
          </button>
        </>
      )}
      {isTabActive('description') && (
        <>
          <div
            className={
              isDescriptionOpened
                ? `${styles['description__body']} ${styles['description__body-opened']}`
                : styles['description__body']
            }
          >
            <h4 className={styles['description__title']}>
              Experience the perfect blend of potency
            </h4>
            <p className={styles['description__text']}>
              Experience the perfect blend of potency and flavor with CanaPuff&apos;s THCp Flower in
              the tantalizing TANGIE BANANA strain. Boasting an impressive 50% THCp content, this
              premium cannabis flower promises a powerful and memorable experience for seasoned
              enthusiasts.Experience the perfect blend of potency and flavor with CanaPuff&apos;s
              THCp Flower in the tantalizing TANGIE BANANA strain. Boasting an impressive 50% THCp
              content, this premium cannabis flower promises a powerful and memorable experience for
              seasoned.
            </p>
            <p className={styles['description__text']}>
              Experience the perfect blend of potency and flavor with CanaPuff&lsquo;s THCp Flower
              in the tantalizing TANGIE BANANA strain. Boasting an impressive 50% THCp content, this
              premium cannabis flower promises a powerful and memorable experience for seasoned
              enthusiasts.Experience the perfect blend of potency and flavor with THCp Flower in the
              tantalizing TANGIE BANANA strain. Boasting an impressive 50% THCp content, this
              premium cannabis flower promises a powerful and memorable experience for seasoned
            </p>
          </div>
          <button
            className={styles['view-btn']}
            onClick={() => setIsDescriptionOpened(!isDescriptionOpened)}
          >
            {isDescriptionOpened ? t('specsTabs.buttons.hide') : t('specsTabs.buttons.viewAll')}
            <Image
              src="/images/productItem/view-all-btn.svg"
              alt="order-symbol"
              style={{ transform: isDescriptionOpened ? 'rotate(180deg)' : 'rotate(0deg)' }}
              width={14}
              height={14}
            />
          </button>
        </>
      )}
      {isTabActive('reviews') && (
        <div className={styles['reviews__body']}>
          <div className={styles['top-bar']}>
            <p className={styles['bar-text']}>{t('specsTabs.reviews.title')}</p>
            <ButtonCO
              theme="orange"
              className={styles['bar-btn']}
              onClick={() => setIsModalOpen(true)}
            >
              {t('specsTabs.buttons.addReview')}
            </ButtonCO>
          </div>
          <div className={styles['reviews__content']}>
            {mockedCommentsData.map((comment) => (
              <div key={comment?.id} className={styles['review__item']}>
                <div key={comment?.id} className={styles['item-header']}>
                  <Image
                    src={comment?.image}
                    alt={comment?.name}
                    className={styles['header-img']}
                    width={60}
                    height={60}
                  />
                  <div key={comment?.id} className={styles['header-content']}>
                    <p key={comment?.id} className={styles['content-name']}>
                      {comment?.name}
                    </p>
                    <div key={comment?.id} className={styles['content-rating']}>
                      <span>{comment?.rate} / 5</span>
                      <span>
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
                      </span>
                    </div>
                  </div>
                </div>
                <div key={comment?.id} className={styles['item-body']}>
                  <p key={comment?.id} className={styles['body-text']}>
                    {comment?.text}
                  </p>
                  {!!comment?.photos?.length && (
                    <div key={comment?.id} className={styles['body-photos']}>
                      {comment?.photos?.map((photo, index) => (
                        <Image key={index} src={photo} alt="review-photo" width={80} height={80} />
                      ))}
                    </div>
                  )}
                  <p key={comment?.id} className={styles['body-text']}>
                    {comment?.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AddReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t} />
    </div>
  );
};

export default ProductSpecsTabs;
