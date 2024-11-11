import styles from './FavoritesButton.module.scss';
import { useTranslations } from 'next-intl';
import { IconHard } from '@UI';
import cn from 'classnames';

const FavoritesButton = ({ alarm }) => {
  const tCommon = useTranslations('common');
  return (
    <div className={styles['favorites']}>
      <span className={styles['favorites__text']}>{tCommon('favorites')}</span>
      <div className={cn(styles['favorites__button'], { [styles['alarm']]: alarm })}>
        <span className={styles['favorites__button-text']}></span>
        <IconHard />
      </div>
    </div>
  );
};

export default FavoritesButton;
