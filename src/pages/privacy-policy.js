import Policy from '@scenes/Policy';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      privacyPolicy: (await import(`../../public/locales/${locale}/privacyPolicy.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const PrivacyPolicy = () => {
  return <Policy pageName={'privacyPolicy'} pageClass={'privacy-policy'} />;
};

export default PrivacyPolicy;
