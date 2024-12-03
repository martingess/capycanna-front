import { useEffect, useState } from 'react';
import Header from '@components/Header';
import HeaderMob from '@components/HeaderMob';
import Footer from '@components/Footer';
import YearsOld from '@components/YearsOld';
import CookieInfo from '@components/CookieInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setOverYears, selectOverYears } from '@store/user/userSlices';
import { Geologica } from 'next/font/google';
import { usePreviousUrl } from '@hooks';
import cn from 'classnames';
import styles from './Layout.module.scss';

const geologica = Geologica({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const Layout = ({ children }) => {
  usePreviousUrl();
  const dispatch = useDispatch();
  const overYears = useSelector(selectOverYears);
  const [isMobile, setIsMobile] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 920px)').matches);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  useEffect(() => {
    setOpen(overYears);
  }, [overYears]);

  const handleClose = () => {
    setOpen(true);
    dispatch(setOverYears(true));
  };
  const reload = () => {
    if (window) {
      window.location.reload();
    }
  };

  return (
    <div className={cn(geologica.className, styles['layout'])}>
      {isMobile ? <HeaderMob isMobile={isMobile} /> : <Header isMobile={isMobile} />}
      {children}
      <Footer />
      <CookieInfo />
      <YearsOld open={!open} handleClose={handleClose} reload={reload} />
    </div>
  );
};

export default Layout;
