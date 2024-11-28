import Policy from '@scenes/Policy';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      disclaimer: (await import(`../../public/locales/${locale}/disclaimer.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const Disclaimer = () => {
  return <Policy pageName={'disclaimer'} pageClass={'disclaimer'} />;
};

export default Disclaimer;
