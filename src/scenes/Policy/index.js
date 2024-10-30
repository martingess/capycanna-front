import { useTranslations } from 'next-intl';
import Head from 'next/head';

const Policy = ({ pageName }) => {
  const t = useTranslations(pageName);
  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
        <meta name="robots" content="noindex" />
      </Head>
      <section className={'policy-section'}>
        <div className={'policy-section__wrapper'}>
          <h1
            className={'policy-section__title'}
            dangerouslySetInnerHTML={{ __html: t('title') }}
          />
          <div
            className={'policy-section__text'}
            dangerouslySetInnerHTML={{ __html: t.raw('text') }}
          />
        </div>
      </section>
    </>
  );
};

export default Policy;
