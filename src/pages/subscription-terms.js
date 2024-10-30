import Policy from '@scenes/Policy';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      subscriptionTerms: (await import(`../../public/locales/${locale}/subscriptionTerms.json`))
        .default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const SubscriptionTerms = () => {
  return <Policy pageName={'subscriptionTerms'} pageClass={'subscription-terms'} />;
};

export default SubscriptionTerms;
