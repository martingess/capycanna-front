import Image from 'next/image';
import Link from 'next/link';
import styles from './DownloadButtons.module.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectDevice } from '@store/user/userSlices';
import configs from '@configs';
const { APPLE_STORE, GOOGLE_STORE } = configs;
import { gaEventDispatch } from '@utils';

const DownloadButtons = () => {
  const device = useSelector(selectDevice);
  const deviceName = device?.name;
  return (
    <div className={styles['buttons']}>
      {['iOS', `Mac`].includes(deviceName) ? (
        <Link
          href={APPLE_STORE}
          target="_blank"
          className={styles['buttons__link']}
          onClick={() => {
            gaEventDispatch({ event: 'app_store_click' });
          }}
        >
          <Image
            src={'/images/Appbutton.png'}
            width={144}
            height={49}
            alt="apple button"
            className={cn(styles['buttons__img'], styles['buttons__img--apple'])}
          />
        </Link>
      ) : deviceName === 'Android' ? (
        <Link
          href={GOOGLE_STORE}
          target="_blank"
          className={styles['buttons__link']}
          onClick={() => {
            gaEventDispatch({ event: 'play_store_click' });
          }}
        >
          <Image
            src={'/images/Googlebutton.png'}
            width={163}
            height={49}
            alt="google button"
            className={cn(styles['buttons__img'], styles['buttons__img--google'])}
          />
        </Link>
      ) : (
        <>
          <Link
            href={GOOGLE_STORE}
            target="_blank"
            className={styles['buttons__link']}
            onClick={() => {
              gaEventDispatch({ event: 'play_store_click' });
            }}
          >
            <Image
              src={'/images/Googlebutton.png'}
              width={163}
              height={49}
              alt="google button"
              className={cn(styles['buttons__img'], styles['buttons__img--google'])}
            />
          </Link>
          <Link
            href={APPLE_STORE}
            target="_blank"
            className={styles['buttons__link']}
            onClick={() => {
              gaEventDispatch({ event: 'app_store_click' });
            }}
          >
            <Image
              src={'/images/Appbutton.png'}
              width={144}
              height={49}
              alt="apple button"
              className={cn(styles['buttons__img'], styles['buttons__img--apple'])}
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default DownloadButtons;
