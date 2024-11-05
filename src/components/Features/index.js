import styles from './Features.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Features = ({ translation }) => {
  const t = useTranslations(translation || 'home');
  const list = Array.isArray(t.raw('features.list')) ? t.raw('features.list') : [];
  return (
    <div className={styles['features']}>
      <div className={styles['features__wrapper']}>
        <div className={styles['features__items']}>
          {list.map(({ title, image, imageBg }) => (
            <div className={styles['features__item']} key={title}>
              <Image
                width={100}
                height={100}
                alt={title}
                src={image}
                className={styles['features__item-img']}
              />
              <Image
                width={100}
                height={100}
                alt={`bg-${title}`}
                src={imageBg}
                className={styles['features__item-bg']}
              />
              <p className={styles['features__item-title']}>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
