import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './AddReview.module.scss';
import Rating from '../../Rating';
import ImageUploader from '../../ImageUploader';
import { ButtonCO } from '@UI';

const AddReviewModal = ({ isOpen, onClose, t }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSendReview = () => {
    const result = {
      selectedRating,
      name,
      comment,
      photos,
    };
    console.log('result', result);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles['overlay']} onClick={onClose}>
      <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
        <button className={styles['closeButton']} onClick={onClose}>
          <Image src="/images/common/close.svg" alt="order-symbol" width={20} height={20} />
        </button>
        <h2 className={styles['title']}>{t('specsTabs.reviews.modal.title')}</h2>
        <div className={styles['rating']}>
          <h4 className={styles['rating__title']}>{t('specsTabs.reviews.modal.rating')}</h4>
          <Rating onRatingChange={(rating) => setSelectedRating(rating)} />
        </div>
        <h5 className={styles['rating__subtitle']}>{t('specsTabs.reviews.modal.name')}</h5>
        <input
          type="text"
          className={styles['input-field']}
          placeholder={t('specsTabs.reviews.modal.namePlaceholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h5 className={styles['rating__subtitle']}>{t('specsTabs.reviews.modal.text')}</h5>
        <textarea
          type="text"
          className={styles['input-field']}
          placeholder={t('specsTabs.reviews.modal.textPlaceholder')}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <h5 className={styles['rating__title']}>{t('specsTabs.reviews.modal.addPhotos')}</h5>
        <ImageUploader t={t} photos={photos} setPhotos={setPhotos} />
        <ButtonCO theme="orange" className={styles['rating__send-btn']} onClick={handleSendReview}>
          {t('specsTabs.reviews.modal.send')}
        </ButtonCO>
      </div>
    </div>
  );
};

export default AddReviewModal;
