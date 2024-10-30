import styles from './Get.module.scss';
import { useTranslations } from 'next-intl';

const Get = ({ translations }) => {
  const t = useTranslations(translations);
  const reviewList = Array.isArray(t.raw('items')) ? t.raw('items') : [];
  return (
    <div className={styles['get']}>
      <h4>{t('title')}</h4>
      <div className={styles['get_list']}>
        {reviewList.map((text) => (
          <p key={text} className={styles['get_item']}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Get;
