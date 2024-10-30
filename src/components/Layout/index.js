import { useEffect } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { usePreviousUrl } from '@hooks';
import cn from 'classnames';
import styles from './Layout.module.scss';
import { getGeoData, setDataAnalytics, getCookie } from '@utils';

import { useSelector, useDispatch } from 'react-redux';
import { selectCountry, setCountry, setCurrency, setDevice } from '@store/user/userSlices';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const Layout = ({ children }) => {
  const { route } = useRouter();
  const isSite = !['/checkout/account', '/checkout', '/checkout/renew-subscription'].includes(
    route,
  );
  const country = useSelector(selectCountry);
  const dispatch = useDispatch();
  usePreviousUrl();

  useEffect(() => {
    const asyncRun = async () => {
      const userData = await getGeoData();
      if (userData) {
        const countryCode = userData?.iso2Code;
        dispatch(setCountry(countryCode));
        if (countryCode) {
          setDataAnalytics({ countryCode });
        }
        dispatch(setDevice(userData.device));
        dispatch(setCurrency({ code: userData.currency, symbol: userData.currencySymbol }));

        try {
          if (userData?.iso2Code) {
            document?.body?.setAttribute('data-country', userData.iso2Code);
          }
        } catch (error) {
          reportError({ error });
        }
      } else {
        dispatch(setCountry('US'));
        setDataAnalytics({ countryCode: 'US' });
      }
    };
    if (!country) {
      asyncRun();
    }

    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    const fbclidCookie = getCookie('_fbc');

    if (fbclidCookie || fbclid) {
      setDataAnalytics({ fbclid: fbclidCookie ?? fbclid });
    }
  }, []);
  return (
    <div
      className={cn(
        inter.className,
        styles['layout'],
        isSite ? styles['site'] : styles['checkout'],
      )}
    >
      {isSite && <Header />}

      {children}
      {isSite && <Footer />}

      <div
        className="analytics tracker banner asbom adsbox ad ads adsbox ad-banner advert advertisement advertisements banner-ad ad-slot ad-wrapper adspace adzone ad-container googleads sponsor"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          visibility: 'hidden',
        }}
      >
        <div>&nbsp;</div>
      </div>
    </div>
  );
};

export default Layout;
