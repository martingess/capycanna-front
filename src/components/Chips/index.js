import styles from './Chips.module.scss';
import { useTranslations } from 'next-intl';
import { Button } from '@UI';
import Image from 'next/image';

const Chips = ({ translation }) => {
  const t = useTranslations(translation || 'home');
  const list = Array.isArray(t.raw('chips.list')) ? t.raw('chips.list') : [];

  return (
    <div className={styles['chips']}>
      <div className={styles['chips__wrapper']}>
        <h3 className={styles['chips__title']}>{t('chips.title')}</h3>
        <div className={styles['chips__items']}>
          {list.map(({ title, text, link, linkText, image, imageMobile }) => (
            <div className={styles['chips__item']} key={title}>
              <h4 className={styles['chips__item-title']}>{title}</h4>
              <div
                className={styles['chips__item-text']}
                dangerouslySetInnerHTML={{ __html: text }}
              />
              <Button href={link} className={styles['chips__item-btn']} small>
                {linkText}
              </Button>
              <Image
                width={375}
                height={229}
                alt={title}
                src={imageMobile}
                className={styles['chips__item-mob']}
              />
              <Image
                width={788}
                height={421}
                alt={title}
                src={image}
                className={styles['chips__item-desc']}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chips;
