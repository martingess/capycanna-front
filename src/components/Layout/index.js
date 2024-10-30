import { useEffect } from 'react';
import Header from '@components/Header';
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

  useEffect(() => {}, []);
  return (
    <div className={cn(geologica.className, styles['layout'])}>
      <Header />

      {children}
      <Footer />
    </div>
  );
};

export default Layout;
