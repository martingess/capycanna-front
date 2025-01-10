import styles from './LoginButton.module.scss';
import { useTranslations } from 'next-intl';
import { IconUser } from '@UI';
import cn from 'classnames';

const LoginButton = ({ alarm, isLoggedIn }) => {
  const tCommon = useTranslations('common');
  return (
    <div className={styles['login']}>
      <span className={styles['login__text']}>{tCommon('logIn')}</span>
      <div className={cn(styles['login__button'], { [styles['alarm']]: alarm })}>
        {!isLoggedIn && <span className={styles['login__button-text']}></span>}
        <IconUser />
      </div>
    </div>
  );
};

export default LoginButton;
