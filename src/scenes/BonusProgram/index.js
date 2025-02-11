/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
import styles from './BonusProgram.module.scss';
import { getBonusBlocksData } from './utils';
import Image from 'next/image';
import FaqSection from '@components/FaqSection';

const BonusProgram = () => {
  const t = useTranslations('bonusProgram');

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['bonus']}>
        <div className={styles['bonus__wrapper']}>
          <Breadcrumbs />
          <h1 className={styles['bonus__title']}>{t('title')}</h1>
          <p className={styles['bonus__description']}>{t('description')}</p>
          <div className={styles['bonus__blocks']}>
            {getBonusBlocksData(t).map((block) => (
              <div key={block.id} className={styles['bonus__block']}>
                <h3 className={styles['bonus__block-title']}>{block.title}</h3>
                <div className={styles['bonus__block-image-wrapper']}>
                  <Image
                    width={120}
                    height={120}
                    alt={block.title}
                    src={block.image}
                    className={styles['bonus__block-image']}
                  />
                  <img
                    alt={block.title}
                    src={block.arrowImage}
                    style={block.arrowConfig}
                    className={styles['bonus__block-image-arrow']}
                  />
                </div>
                <p className={styles['bonus__block-subText']}>{block.subText}</p>
              </div>
            ))}
          </div>
          <h1 className={styles['bonus__title']}>{t('descriptionBlock.title')}</h1>
          <div className={styles['bonus__description-wrapper']}>
            <div className={styles['bonus__description-image']}>
              <div className={styles['texts-wrapper']}>
                <p>{t('descriptionBlock.imageText1')}</p>
                <p>{t('descriptionBlock.imageText2')}</p>
                <p>{t('descriptionBlock.imageText3')}</p>
              </div>
            </div>
            <div className={styles['bonus__description-main']}>
              <p className={styles['bonus__description']} style={{ textAlign: 'left' }}>
                {t('descriptionBlock.main.title')}
              </p>
              <p className={styles['bonus__description-text']}>{t('descriptionBlock.main.text')}</p>
            </div>
          </div>
          <FaqSection translation={'bonusProgram'} />
        </div>
      </section>
    </>
  );
};

export default BonusProgram;
