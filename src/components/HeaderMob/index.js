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
import MenuButton from '@components/MenuButton';
import ProductsButton from '@components/ProductsButton';
import cn from 'classnames';
import styles from './HeaderMob.module.scss';

const HeaderMob = () => {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [typeMenu, setTypeMenu] = useState(null);
  const [openedCurrency, setOpenedCurrency] = useState(false);
  const [openedCountry, setOpenedCountry] = useState(false);
  const productsItems = typeof t.raw('productsItems') === 'object' ? t.raw('productsItems') : {};
  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleOpenCurrency = (openedCurrency, openedCountry) => () => {
    setOpenedCurrency(!openedCurrency);
    if (openedCountry) {
      setOpenedCountry(false);
    }
  };
  const handleOpenCountry = (openedCountry, openedCurrency) => () => {
    setOpenedCountry(!openedCountry);
    if (openedCurrency) {
      setOpenedCurrency(false);
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
      document.body.style.overflow = 'auto';
    }
  }, [openedMenu]);

  const handleMenu = (boll) => () => {
    setOpenedMenu(!boll);
  };

  return (
    <>
      <header
        className={cn(styles['header'], {
          [styles['sticky']]: isScrolled,
          [styles['openedMenu']]: openedMenu,
        })}
      >
        <div className={styles['header__top']}>
          <div className={styles['header__wrapper']}>
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
            <div className={styles['header__data']}>
              <Currency
                open={openedCurrency}
                handleOpen={handleOpenCurrency(openedCurrency, openedCountry)}
              />
              <Country
                open={openedCountry}
                handleOpen={handleOpenCountry(openedCountry, openedCurrency)}
              />
            </div>
          </div>
        </div>
      </header>
      <div className={styles['menu']}>
        <div className={styles['menu__wrapper']}>
          <LoginButton />
          <FavoritesButton />
          <CartButton />
          <ProductsButton />
          <MenuButton handleMenu={handleMenu(openedMenu)} open={openedMenu} />
        </div>
      </div>
    </>
  );
};

export default HeaderMob;
