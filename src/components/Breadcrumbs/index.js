import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconArrowDown } from '@UI';
import styles from './Breadcrumbs.module.scss';
import { useTranslations } from 'next-intl';

const Breadcrumbs = ({ productTitle }) => {
  const router = useRouter();
  const { pathname = '' } = router;
  const tCommon = useTranslations('common');

  const dynamicRoutePattern = /^\[.*\]$/;
  const pathArray = pathname
    .split('/')
    .filter((segment) => segment && !dynamicRoutePattern.test(segment));

  const breadcrumbs = pathArray.map((segment, index) => {
    const path = '/' + pathArray.slice(0, index + 1).join('/');
    return { label: segment, href: path };
  });

  console.log('!!', breadcrumbs, pathname, productTitle);

  if (productTitle) {
    breadcrumbs.push({ label: productTitle, href: pathname });
  }

  return (
    <nav aria-label="breadcrumbs" className={styles['breadcrumbs']}>
      <ul className={styles['breadcrumbs__items']}>
        <li className={styles['breadcrumbs__item']}>
          <Link href="/">Home</Link>
          {breadcrumbs.length > 0 && <IconArrowDown className={styles['breadcrumbs__icon']} />}
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className={styles['breadcrumbs__item']}>
            {index !== breadcrumbs.length - 1 ? (
              <>
                <Link href={crumb.href}>{crumb.label}</Link>
                <IconArrowDown className={styles['breadcrumbs__icon']} />
              </>
            ) : (
              <span>{productTitle ? crumb.label : tCommon(`breadcrumbs.${crumb.label}`)}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
