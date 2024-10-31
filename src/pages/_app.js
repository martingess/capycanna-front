import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import '@/styles/globals/index.scss';

import { reportError } from '@utils';
import store from '@/store';
import Layout from '@components/Layout';
import configs from '@configs';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';

const { DOMAIN_FRONT } = configs;

const App = ({ Component, pageProps: { ...pageProps } }) => {
  const { asPath, locale } = useRouter();
  const pathUrl = asPath === '/' ? '' : asPath;
  const localeUrl = (l) => (l === 'en' ? '' : `/${l}`);

  const onIntlError = (error) => {
    reportError({ error });
  };

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pageProps.messages}
      timeZone="Europe/Vienna"
      onError={onIntlError}
    >
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="canonical" href={`${DOMAIN_FRONT}${localeUrl(locale)}${pathUrl}`} />
            <link rel="alternate" hrefLang="x-default" href={`${DOMAIN_FRONT}${pathUrl}`} />
          </Head>
          <Layout>
            <Toaster position="top-right" />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </NextIntlClientProvider>
  );
};

export default App;
