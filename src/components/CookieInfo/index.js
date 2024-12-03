import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { setCookieInfo, selectCookieInfo } from '@store/user/userSlices';
import { ButtonCO } from '@UI';
import Link from 'next/link';

import cn from 'classnames';
import styles from './CookieInfo.module.scss';

const CookieInfo = () => {
  const t = useTranslations('footer');
  const dispatch = useDispatch();
  const isCookieInfo = useSelector(selectCookieInfo);

  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    setShowCookie(isCookieInfo);
  }, [isCookieInfo]);

  const handleCookieInfo = () => dispatch(setCookieInfo(false));
  const handleSettings = () => dispatch(setCookieInfo(false));

  return (
    <div
      className={cn(styles['cookie'], {
        [styles['active']]: showCookie,
      })}
    >
      <div className={cn('wrapper', styles['cookie__wrapper'])}>
        <p className={styles['cookie__text']}>
          {t.rich('cookies.text', {
            link: (chunks) => (
              <Link href="/cookie-policy" prefetch={false}>
                {chunks}
              </Link>
            ),
          })}
        </p>
        <div className={styles['cookie__buttons']}>
          <ButtonCO theme="orange" className={styles['cookie__button']} onClick={handleCookieInfo}>
            {t('cookies.accept')}
          </ButtonCO>
          <ButtonCO theme="yellow" className={styles['cookie__button']} onClick={handleSettings}>
            {t('cookies.settings')}
          </ButtonCO>
        </div>
      </div>
    </div>
  );
};

export default CookieInfo;
