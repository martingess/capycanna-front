import styles from './Categories.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import cn from 'classnames';

const Categories = ({ translation }) => {
  const t = useTranslations(translation || 'home');
  const list = Array.isArray(t.raw('categories.list')) ? t.raw('categories.list') : [];
  return (
    <div className={styles['categories']}>
      <div className={styles['categories__wrapper']}>
        <h3 className={styles['categories__title']}>{t('categories.title')}</h3>
        <p className={styles['categories__description']}>{t('categories.description')}</p>
        <div className={styles['categories__items']}>
          {list.map(({ title, imageBg, image, type }) => (
            <div className={cn(styles['categories__item'], styles[type])} key={title}>
              <h4 className={styles['categories__item-title']}>{title}</h4>
              <Image
                width={382}
                height={536}
                alt={title}
                src={imageBg}
                className={styles['categories__item-bg']}
              />
              <Image
                width={382}
                height={536}
                alt={title}
                src={image}
                className={styles['categories__item-preview']}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
