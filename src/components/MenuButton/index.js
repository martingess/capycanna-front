import styles from './MenuButton.module.scss';
import { useTranslations } from 'next-intl';
import { IconHard } from '@UI';
import cn from 'classnames';

const MenuButton = ({ alarm }) => {
  const tCommon = useTranslations('common');
  return (
    <div className={styles['menu']}>
      <span className={styles['menu__text']}>{tCommon('menu')}</span>
      <div className={cn(styles['menu__button'], { [styles['alarm']]: alarm })}>
        <span className={styles['menu__button-text']}></span>
        <IconHard />
      </div>
    </div>
  );
};

export default MenuButton;
