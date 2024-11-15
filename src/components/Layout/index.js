import { useEffect, useState } from 'react';
import Header from '@components/Header';
import HeaderMob from '@components/HeaderMob';
import Footer from '@components/Footer';
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
  const [isMobile, setIsMobile] = useState(true);

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

  useEffect(() => {}, []);
  return (
    <div className={cn(geologica.className, styles['layout'])}>
      {isMobile ? <HeaderMob /> : <Header />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
