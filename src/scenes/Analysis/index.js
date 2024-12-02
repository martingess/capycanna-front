import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
import Link from 'next/link';
import { IconPdf } from '@UI';
import styles from './Analysis.module.scss';

const Analysis = () => {
  const t = useTranslations('analysis');
  const items = Array.isArray(t.raw('items')) ? t.raw('items') : [];
  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['analysis']}>
        <div className={styles['analysis__wrapper']}>
          <Breadcrumbs />
          <h1 className={styles['analysis__title']}>{t('title')}</h1>
          <div className={styles['analysis__items']}>
            {items.map(({ title, text, link, linkText }) => (
              <div className={styles['analysis__item']} key={title}>
                <IconPdf className={styles['analysis__item-icon']} />
                <h3 className={styles['analysis__item-title']}>{title}</h3>
                <div
                  className={styles['analysis__item-text']}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
                <Link className={styles['analysis__item-link']} href={link}>
                  {linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Analysis;
