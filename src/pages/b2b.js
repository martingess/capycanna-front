import TextPage from '@scenes/TextPage';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      b2b: (await import(`../../public/locales/${locale}/b2b.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const B2B = () => {
  return <TextPage translation="b2b" />;
};

export default B2B;
