import Policy from '@scenes/Policy';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      cookiePolicy: (await import(`../../public/locales/${locale}/cookiePolicy.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const CookiePolicy = () => {
  return <Policy pageName={'cookiePolicy'} pageClass={'cookie-policy'} />;
};

export default CookiePolicy;
