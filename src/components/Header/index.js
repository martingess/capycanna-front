import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IconPercent, IconPipette, IconArrowDown, IconDrop, IconFlask } from '@UI';
import Currency from '@components/Currency';
import Country from '@components/Country';
import { useTranslations } from 'next-intl';
import LoginButton from '@components/LoginButton';
import FavoritesButton from '@components/FavoritesButton';
import CartButton from '@components/CartButton';
import cn from 'classnames';
import styles from './Header.module.scss';

const Header = () => {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const productsItems = Array.isArray(t.raw('productsItems')) ? t.raw('productsItems') : [];

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
          <div className={styles['header__data']}>
            <Currency />
            <Country />
          </div>
        </div>
      </div>
      <div className={styles['header__bottom']}>
        <div className={styles['header__bottom-wrapper']}>
          <div className={styles['header__bottom-left']}>
            <Link href="/" className={styles['header__logo']}>
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={54}
                height={45}
                className={styles['header__logo-img']}
              />
              <p className={styles['header__logo-text']}>СapyCannа</p>
            </Link>
            <Link href="/sale" className={styles['header__sale']}>
              <IconPercent className={styles['header__sale-icon']} />
              {tCommon('sale')}
            </Link>
          </div>
          <menu className={styles['menu']}>
            <div className={styles['menu__item']}>
              <IconPipette className={styles['menu__item-icon']} />
              <p className={styles['menu__item-text']}>{t('products')}</p>
              <IconArrowDown className={styles['menu__item-arrow']} />
            </div>
            <div className={styles['menu__item']}>
              <IconDrop className={styles['menu__item-icon']} />
              <p className={styles['menu__item-text']}>{t('cannabinoids')}</p>
              <IconArrowDown className={styles['menu__item-arrow']} />
            </div>
            <div className={styles['menu__item']}>
              <IconFlask className={styles['menu__item-icon']} />
              <p className={styles['menu__item-text']}>{t('findSomething')}</p>
              <IconArrowDown className={styles['menu__item-arrow']} />
            </div>
          </menu>
          <div className={styles['header__bottom-right']}>
            <LoginButton />
            <FavoritesButton />
            <CartButton />
          </div>
        </div>
      </div>
      <div className={styles['trailer']}>
        <div className={styles['trailer__categories']}>
          <div className={styles['trailer__wrapper']}>
            <div className={styles['trailer__items']}>
              {productsItems.map(({ name, description, link, image }) => (
                <div className={styles['trailer__item']} key={name}>
                  <Link href={link} className={styles['trailer__item-link']} />
                  <Image
                    src={image}
                    alt={name}
                    width={100}
                    height={100}
                    className={styles['trailer__item-img']}
                  />
                  <div className={styles['trailer__item-content']}>
                    <p className={styles['trailer__item-title']}>{name}</p>
                    <p className={styles['trailer__item-description']}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
