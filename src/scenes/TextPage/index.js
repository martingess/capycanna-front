import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';

const TextPage = ({ translation }) => {
  const t = useTranslations(translation);
  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={'text'}>
        <div className={'text__wrapper'}>
          <Breadcrumbs />
        </div>
      </section>
    </>
  );
};

export default TextPage;
