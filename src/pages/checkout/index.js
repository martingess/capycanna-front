import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Checkout from '@scenes/Checkout';
import { useSelector, useDispatch } from 'react-redux';
import { selectEmail, setEmail } from '@store/user/userSlices';
import isEmail from 'validator/lib/isEmail.js';
import configs from '@configs';
import { gaEventDispatch } from '@utils';

const { DOMAIN_FRONT } = configs;

export const getServerSideProps = async (context) => {
  const { query, locale } = context;
  const email = query?.email ? query?.email : null;
  const typePrices = query?.typePrices ? query?.typePrices : null;

  return {
    props: {
      messages: {
        header: (await import(`../../../public/locales/${locale}/header.json`)).default,
        checkout: (await import(`../../../public/locales/${locale}/checkout.json`)).default,
        common: (await import(`../../../public/locales/${locale}/common.json`)).default,
        footer: (await import(`../../../public/locales/${locale}/footer.json`)).default,
      },
      ...(email && { email }),
      ...(typePrices && { typePrices }),
    },
  };
};

export default function CheckoutPage(props) {
  const t = useTranslations('checkout');
  const emailFromStore = useSelector(selectEmail);
  const dispatch = useDispatch();
  const emailQuery = props?.email ? decodeURIComponent(props?.email?.replace(/ /g, '+')) : null;
  const email = emailQuery ?? emailFromStore;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    gaEventDispatch({ event: 'sales_page_show' });
  }, []);

  useEffect(() => {
    if (emailQuery) {
      dispatch(setEmail(emailQuery));
    }
  }, [props?.email, dispatch]);

  useEffect(() => {
    if (isClient && (!email || !isEmail(email))) {
      window.location.href = `${DOMAIN_FRONT}/onboarding/funnel/`;
    }
  }, [isClient, email]);

  if (!isClient || !email || !isEmail(email)) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <Checkout {...props} />
    </>
  );
}
