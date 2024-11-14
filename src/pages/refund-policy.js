import Policy from '@scenes/Policy';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      refundPolicy: (await import(`../../public/locales/${locale}/refundPolicy.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const RefundPolicy = () => {
  return <Policy pageName={'refundPolicy'} pageClass={'refund-policy'} />;
};

export default RefundPolicy;
