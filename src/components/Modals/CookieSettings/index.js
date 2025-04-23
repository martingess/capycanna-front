import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './CookieSettings.module.scss';
import Switch from '../../UI/Switch';

const CookieSettingsModal = ({ isOpen, onClose, t }) => {
  const [isAnalytictsOn, setIsAnalytictsOn] = useState(true);
  const [isMarketingOn, setIsMarketingOn] = useState(true);

  if (!isOpen) return null;

  return (
    <div className={styles['overlay']} onClick={onClose}>
      <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
        <button className={styles['closeButton']} onClick={onClose}>
          <Image src="/images/common/close.svg" alt="order-symbol" width={20} height={20} />
        </button>
        <h2 className={styles['title']}>{t('cookieSettingsModal.mainTitle')}</h2>
        <p className={styles['description']} style={{ marginBottom: '20px' }}>
          {t('cookieSettingsModal.mainDescription')}
        </p>
        <div className={styles['scroll-container']}>
          <div className={styles['content-block']}>
            <h3 className={styles['content-title']}>{t('cookieSettingsModal.title1')}</h3>
            <p className={styles['description']}>{t('cookieSettingsModal.description1')}</p>
          </div>
          <div className={styles['content-block']}>
            <h3 className={styles['content-title']}>{t('cookieSettingsModal.title2')}</h3>
            <p className={styles['description']}>{t('cookieSettingsModal.description2')}</p>
            <div>
              <div className={styles['switch-wrapper']}>
                <Switch
                  checked={isAnalytictsOn}
                  onChange={() => setIsAnalytictsOn(!isAnalytictsOn)}
                />
                <span>
                  {isAnalytictsOn
                    ? t('cookieSettingsModal.enable')
                    : t('cookieSettingsModal.disable')}
                </span>
              </div>
            </div>
          </div>
          <div className={styles['content-block']}>
            <h3 className={styles['content-title']}>{t('cookieSettingsModal.title3')}</h3>
            <p className={styles['description']}>{t('cookieSettingsModal.description3')}</p>
            <div className={styles['switch-wrapper']}>
              <Switch checked={isMarketingOn} onChange={() => setIsMarketingOn(!isMarketingOn)} />
              <span>
                {isMarketingOn ? t('cookieSettingsModal.enable') : t('cookieSettingsModal.disable')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettingsModal;
