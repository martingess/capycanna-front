import RenewSubscription from '@scenes/RenewSubscription';

export async function getServerSideProps(context) {
  const { subscriptionId } = context.query;
  const locale = context?.locale ?? context?.defaultLocale ?? 'en';

  if (!subscriptionId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      messages: {
        header: (await import(`../../../public/locales/${locale}/header.json`)).default,
        renewSubscription: (
          await import(`../../../public/locales/${locale}/renewSubscription.json`)
        ).default,
        common: (await import(`../../../public/locales/${locale}/common.json`)).default,
        footer: (await import(`../../../public/locales/${locale}/footer.json`)).default,
      },
    },
  };
}

const RenewSubscriptionPage = () => {
  return <RenewSubscription />;
};

export default RenewSubscriptionPage;
