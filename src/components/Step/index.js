import styles from './Step.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Step = ({ translation }) => {
  const t = useTranslations(translation || 'home');
  return (
    <div className={styles['step']}>
      <div className={styles['step__wrapper']}>
        <div className={styles['step__content']}>
          <h3 className={styles['step__title']}>{t('step.title')}</h3>
          <div
            dangerouslySetInnerHTML={{ __html: t.raw('step.text') }}
            className={styles['step__text']}
          />
        </div>
        <Image
          width={788}
          height={567}
          alt={t('step.title')}
          src={t('step.image')}
          className={styles['step__image']}
        />
      </div>
      <Image
        src={'/images/products/bg-step.png'}
        width={1918}
        height={938}
        alt="products-bg"
        className={styles['step__bg']}
      />
    </div>
  );
};

export default Step;
