import { NotFound } from '@/components/Errors';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      notFound: (await import(`../../public/locales/${locale}/notFound.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});

export default function NotFoundPage(...props) {
  return <NotFound />;
}
