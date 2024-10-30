import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@UI';
import { useTranslations } from 'next-intl';
import cn from 'classnames';
import styles from './Header.module.scss';

const Header = () => {
  const tCommon = useTranslations('common');
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
      <div className={cn('wrapper', styles['header__wrapper'])}>
        <Link href="/" className={styles['header__logo']}>
          <Image
            className={styles['header__logo-img']}
            src={`/images/logo.svg`}
            width={60}
            height={50}
            quality={100}
            alt="logo risemee"
          />
        </Link>
        <Button href="/onboarding" outside={true}>
          {tCommon('startQuiz')}
        </Button>
      </div>
    </header>
  );
};

export default Header;
