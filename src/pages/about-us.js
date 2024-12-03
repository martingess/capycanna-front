import AboutUs from '@scenes/AboutUs';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      aboutUs: (await import(`../../public/locales/${locale}/aboutUs.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});

export default function AnalysisPage(...props) {
  return <AboutUs />;
}
