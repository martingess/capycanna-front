import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IconPercent, IconPipette, IconArrowDown, IconDrop, IconFlask, CollapseExpand } from '@UI';
import Currency from '@components/Currency';
import Language from '@/components/Language';
import { useTranslations } from 'next-intl';
import LoginButton from '@components/LoginButton';
import FavoritesButton from '@components/FavoritesButton';
import CartButton from '@components/CartButton';
import MenuButton from '@components/MenuButton';
import ProductsButton from '@components/ProductsButton';
import cn from 'classnames';
import styles from './HeaderMob.module.scss';

const Trailer = ({ items = [], nameType }) => {
  const t = useTranslations('header');
  const [opened, setOpened] = useState(false);
  const handleOpen = () => {
    setOpened(!opened);
  };
  return (
    <div
      className={cn(styles['trailer'], {
        [styles['active']]: opened,
      })}
    >
      <div className={styles['trailer__wrapper']}>
        <div className={styles['trailer__top']} onClick={handleOpen}>
          {nameType === 'products' && <IconPipette className={styles['trailer__top-icon']} />}
          {nameType === 'cannabinoids' && <IconDrop className={styles['trailer__top-icon']} />}
          {nameType === 'findSomething' && <IconFlask className={styles['trailer__top-icon']} />}

          <p className={styles['trailer__top-text']}>{t(`${nameType}`)}</p>
          <IconArrowDown className={styles['trailer__top-arrow']} />
        </div>
        <CollapseExpand isOpen={opened}>
          <div className={styles['trailer__items']}>
            {items.map(({ name, image, description, link }) => (
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
        </CollapseExpand>
      </div>
    </div>
  );
};

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
              <Language
                open={openedCountry}
                handleOpen={handleOpenCountry(openedCountry, openedCurrency)}
              />
            </div>
          </div>
        </div>
        <div className={styles['header__center']}>
          <div className={styles['header__wrapper']}>
            <Link href="/sale" className={styles['header__sale']}>
              <IconPercent className={styles['header__sale-icon']} />
              {tCommon('sale')}
            </Link>
          </div>
        </div>
        <div className={styles['nav']}>
          {Object.entries(productsItems).map(([key, value]) => (
            <Trailer key={key} nameType={key} items={value} />
          ))}
          <div className={styles['nav__links']}>
            <Link href="/b2b-wholesale" className={styles['nav__link']}>
              {t('b2b')}
            </Link>
            <Link href="/affiliate" className={styles['nav__link']}>
              {t('affiliateProgram')}
            </Link>
            <Link href="/shipping-payment" className={styles['nav__link']}>
              {t('shippingAndPayment')}
            </Link>
            <Link href="/bonus" className={styles['nav__link']}>
              {t('bonusProgram')}
            </Link>
            <Link href="/blog" className={styles['nav__link']}>
              {t('blog')}
            </Link>
            <Link href="/contact" className={styles['nav__link']}>
              {t('contactUs')}
            </Link>
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
