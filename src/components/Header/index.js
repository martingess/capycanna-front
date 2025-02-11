import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IconPercent, IconPipette, IconArrowDown, IconDrop, IconFlask } from '@UI';
import Currency from '@components/Currency';
import Language from '@/components/Language';
import { useTranslations } from 'next-intl';
import LoginButton from '@components/LoginButton';
import FavoritesButton from '@components/FavoritesButton';
import CartButton from '@components/CartButton';
import cn from 'classnames';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';

const Header = () => {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [typeMenu, setTypeMenu] = useState(null);
  const { pathname } = useRouter();
  const productsItems = typeof t.raw('productsItems') === 'object' ? t.raw('productsItems') : {};
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

  useEffect(() => {
    if (openedMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  }, [openedMenu]);

  const handleMenu = (menuType) => () => {
    if (typeMenu === menuType) {
      setOpenedMenu(false);
      setTypeMenu(null);
      return;
    } else {
      setOpenedMenu(true);
      setTypeMenu(menuType);
    }
    // setOpenedMenu(false);
  };
  const handleClickCloseMenu = () => {
    setOpenedMenu(false);
    setTypeMenu(null);
  };

  return (
    <header
      className={cn(styles['header'], {
        [styles['sticky']]: isScrolled,
        [styles['openedMenu']]: openedMenu,
      })}
    >
      <div className={styles['header__top']}>
        <div className={styles['header__top-wrapper']}>
          <div className={styles['header__top-links']}>
            <Link
              href="/b2b"
              className={cn(styles['header__top-link'], {
                [styles['active']]: pathname === '/b2b',
              })}
            >
              {t('b2b')}
            </Link>
            <Link
              href="/affiliate"
              className={cn(styles['header__top-link'], {
                [styles['active']]: pathname === '/affiliate',
              })}
            >
              {t('affiliateProgram')}
            </Link>
            <Link
              href="/shipping-payment"
              className={cn(styles['header__top-link'], {
                [styles['active']]: pathname === '/shipping-payment',
              })}
            >
              {t('shippingAndPayment')}
            </Link>
            <Link
              href="/bonus"
              className={cn(styles['header__top-link'], {
                [styles['active']]: pathname === '/bonus',
              })}
            >
              {t('bonusProgram')}
            </Link>
            <Link
              href="/blog"
              className={cn(styles['header__top-link'], {
                [styles['active']]: pathname === '/blog',
              })}
            >
              {t('blog')}
            </Link>
            <Link
              href="/contact"
              className={cn(styles['header__top-link'], {
                [styles['active']]: pathname === '/contact',
              })}
            >
              {t('contactUs')}
            </Link>
          </div>
          <div className={styles['header__data']}>
            <Currency />
            <Language />
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
          <div className={styles['menu']}>
            <div
              className={cn(styles['menu__item'], {
                [styles['active']]: typeMenu === 'products',
              })}
              onClick={handleMenu('products')}
            >
              <IconPipette className={styles['menu__item-icon']} />
              <p className={styles['menu__item-text']}>{t('products')}</p>
              <IconArrowDown className={styles['menu__item-arrow']} />
            </div>
            <div
              className={cn(styles['menu__item'], {
                [styles['active']]: typeMenu === 'cannabinoids',
              })}
              onClick={handleMenu('cannabinoids')}
            >
              <IconDrop className={styles['menu__item-icon']} />
              <p className={styles['menu__item-text']}>{t('cannabinoids')}</p>
              <IconArrowDown className={styles['menu__item-arrow']} />
            </div>
            <div
              className={cn(styles['menu__item'], {
                [styles['active']]: typeMenu === 'findSomething',
              })}
              onClick={handleMenu('findSomething')}
            >
              <IconFlask className={styles['menu__item-icon']} />
              <p className={styles['menu__item-text']}>{t('findSomething')}</p>
              <IconArrowDown className={styles['menu__item-arrow']} />
            </div>
          </div>
          <div className={styles['header__bottom-right']}>
            <LoginButton isLoggedIn={false} /> {/* TODO: with login logic */}
            <FavoritesButton />
            <CartButton />
          </div>
        </div>
      </div>
      <div className={styles['trailer']} onClick={handleClickCloseMenu}>
        <div
          className={cn(styles['trailer__categories'], {
            [styles['active']]: typeMenu === 'products',
          })}
        >
          <div className={styles['trailer__items']}>
            {productsItems['products']?.map(({ name, description, link, image }) => (
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
        <div
          className={cn(styles['trailer__categories'], {
            [styles['active']]: typeMenu === 'cannabinoids',
          })}
        >
          <div className={styles['trailer__items']}>
            {productsItems['cannabinoids']?.map(({ name, description, link, image }) => (
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
        <div
          className={cn(styles['trailer__categories'], {
            [styles['active']]: typeMenu === 'findSomething',
          })}
        >
          <div className={styles['trailer__items']}>
            {productsItems['findSomething']?.map(({ name, description, link, image }) => (
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
    </header>
  );
};

export default Header;
