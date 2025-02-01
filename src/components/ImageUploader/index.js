/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react';
import styles from './ImageUploader.module.scss';
import { ButtonCO } from '@UI';
import Image from 'next/image';

const ImageUploader = ({ t, photos, setPhotos }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) =>
      ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
    );

    const imageUrls = validFiles.map((file) => ({
      id: URL.createObjectURL(file),
      src: URL.createObjectURL(file),
    }));

    setPhotos((prevImages) => [...prevImages, ...imageUrls]);
  };

  const removeImage = (id) => {
    setPhotos(photos.filter((image) => image.id !== id));
  };

  return (
    <div className={styles.uploaderWrapper}>
      <div className={styles.uploader}>
        <p className={styles.uploadText}>{t('specsTabs.reviews.modal.addPhotosText')}</p>
        <ButtonCO
          theme="orange"
          className={styles.uploadButton}
          onClick={() => fileInputRef.current.click()}
        >
          <Image src="/images/productItem/img-file.svg" alt="order-symbol" width={30} height={30} />
        </ButtonCO>
      </div>
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif"
        className={styles.input}
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <div className={styles.imagePreview}>
        {photos.map((image) => (
          <div key={image.id} className={styles.imageContainer}>
            <img src={image.src} alt="Uploaded" />
            <button className={styles.removeButton} onClick={() => removeImage(image.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
