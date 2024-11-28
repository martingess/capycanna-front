import Policy from '@scenes/Policy';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      returnPolicy: (await import(`../../public/locales/${locale}/returnPolicy.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const ReturnPolicy = () => {
  return <Policy pageName={'returnPolicy'} pageClass={'return-policy'} />;
};

export default ReturnPolicy;
