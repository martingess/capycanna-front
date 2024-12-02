import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { setCookieInfo, selectCookieInfo } from '@store/user/userSlices';
import { ButtonCO } from '@UI';

import cn from 'classnames';
import styles from './CookieInfo.module.scss';

const CookieInfo = () => {
  const t = useTranslations('footer');
  const dispatch = useDispatch();
  const isCookieInfo = useSelector(selectCookieInfo);

  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    if (isCookieInfo) {
      setShowCookie(isCookieInfo);
    }
  }, [isCookieInfo]);

  const handleCookieInfo = () => dispatch(setCookieInfo(false));

  return (
    <div
      className={cn(styles['cookie'], {
        [styles['is-active']]: showCookie,
      })}
    >
      <div className={cn('wrapper', styles['cookie__wrap'])}>
        <p className={styles['cookie__text']}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, doloribus. Dignissimos ut
          fugit quas doloremque dolorum adipisci optio consectetur animi excepturi porro! Cupiditate
          suscipit perferendis consequuntur a dolorem architecto nihil?
        </p>
        <ButtonCO theme="orange" className={styles['cookie__button']} onClick={handleCookieInfo}>
          {t('ok')}
        </ButtonCO>
      </div>
    </div>
  );
};

export default CookieInfo;
