import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@UI';
import { useTranslations } from 'next-intl';
import cn from 'classnames';
import styles from './Header.module.scss';

const Header = () => {
  const t = useTranslations('header');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header
      className={cn(styles['header'], {
        [styles['sticky']]: isScrolled,
      })}
    >
      <div className={styles['header__top']}>
        <div className={styles['header__top-wrapper']}>
          <div className={styles['header__top-links']}>
            <Link href="/b2b" className={styles['header__top-link']}>
              {t('b2b')}
            </Link>
            <Link href="/affiliate" className={styles['header__top-link']}>
              {t('affiliateProgram')}
            </Link>
            <Link href="/shipping-payment" className={styles['header__top-link']}>
              {t('shippingAndPayment')}
            </Link>
            <Link href="/bonus" className={styles['header__top-link']}>
              {t('bonusProgram')}
            </Link>
            <Link href="/blog" className={styles['header__top-link']}>
              {t('blog')}
            </Link>
            <Link href="/contact" className={styles['header__top-link']}>
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </div>
      <div className={styles['header__bottom']}>
        <div className={styles['header__bottom-wrapper']}></div>
      </div>
    </header>
  );
};

export default Header;
