import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
import styles from './Products.module.scss';
import Link from 'next/link';

const Products = () => {
  const t = useTranslations('products');
  const categories = ['electronics', 'clothing'];

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['contact']}>
        <div className={styles['contact__wrapper']}>
          <Breadcrumbs />
          <h1 className={styles['contact__title']}>{t('title')}</h1>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link href={`/products/${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Products;
