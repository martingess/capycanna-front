import Policy from '@scenes/Policy';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      termsAndConditions: (await import(`../../public/locales/${locale}/termsAndConditions.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const TermsAndConditions = () => {
  return <Policy pageName={'termsAndConditions'} />;
};

export default TermsAndConditions;
