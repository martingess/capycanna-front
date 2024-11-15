import styles from './MenuButton.module.scss';
import { useTranslations } from 'next-intl';

import cn from 'classnames';

const MenuButton = ({ handleMenu, open }) => {
  const tCommon = useTranslations('common');
  return (
    <div className={cn(styles['menu'], { [styles['open']]: open })} onClick={handleMenu}>
      <span className={styles['menu__text']}>{tCommon('menu')}</span>
      <div className={styles['menu__button']}>
        <div className={styles['menu__icon']}>
          <span />
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
