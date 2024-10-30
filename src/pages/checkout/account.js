import ActivateAccount from '@scenes/ActivateAccount';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../../public/locales/${locale}/header.json`)).default,
      activateAccount: (await import(`../../../public/locales/${locale}/activateAccount.json`))
        .default,
      common: (await import(`../../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const ActivateAccountPage = () => {
  const t = useTranslations('activateAccount');
  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <ActivateAccount />
    </>
  );
};

export default ActivateAccountPage;
