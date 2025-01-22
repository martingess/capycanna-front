import { IconLanguage, IconArrowDown } from '@UI';
import { useEffect, useState } from 'react';
import styles from './Language.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';

export const languages = {
  en: {
    path: '',
    alternate: 'en',
  },
  de: {
    path: '/de',
    alternate: 'de',
  },
  cz: {
    path: '/cz',
    alternate: 'cz',
  },
  fr: {
    path: '/fr',
    alternate: 'fr',
  },
};

const Language = ({ open = false, handleOpen = () => {} }) => {
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const changeLanguage = (newLanguage) => async (event) => {
    event.preventDefault();

    await router.push({ pathname, query }, asPath, { locale: newLanguage });
    handleOpen(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles['language']}>
      <div
        className={cn(styles['language__wrapper'], {
          [styles['open']]: open,
        })}
        onClick={handleOpen}
      >
        <div className={styles['language__top']}>
          <IconLanguage className={styles['language__icon']} />
          {isClient && <p className={styles['language__name']}>{locale}</p>}
          <IconArrowDown className={styles['language__arrow']} />
        </div>
        <div className={styles['language__list']}>
          {Object.entries(languages).map(([key, { path }]) => {
            const url = `${path}${pathname}`;

            return (
              <Link
                href={`${url}`}
                key={key}
                aria-label={`Change language to ${key}`}
                className={cn(styles['language__item'], {
                  [styles['active']]: key === locale,
                })}
                onClick={changeLanguage(key)}
              >
                {key}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Language;
