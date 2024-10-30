import Policy from '@scenes/Policy';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      termsOfUse: (await import(`../../public/locales/${locale}/termsOfUse.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const TermsOfUse = () => {
  return <Policy pageName={'termsOfUse'} />;
};

export default TermsOfUse;
