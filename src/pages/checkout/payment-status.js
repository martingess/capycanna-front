import PaymentStatus from '@scenes/PaymentStatus';

export async function getServerSideProps(context) {
  const { redirect_status } = context.query;
  const locale = context?.locale ?? context?.defaultLocale ?? 'en';

  if (!redirect_status) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      messages: {
        header: (await import(`../../../public/locales/${locale}/header.json`)).default,
        common: (await import(`../../../public/locales/${locale}/common.json`)).default,
        footer: (await import(`../../../public/locales/${locale}/footer.json`)).default,
      },
      redirectStatus: redirect_status,
    },
  };
}

const PaymentStatusPage = (props) => {
  return <PaymentStatus {...props} />;
};

export default PaymentStatusPage;
