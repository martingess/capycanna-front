import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumbs = () => {
  const router = useRouter();
  const { pathname } = router;

  const pathArray = pathname.split('/').filter((segment) => segment);
  const breadcrumbs = pathArray.map((segment, index) => {
    const path = '/' + pathArray.slice(0, index + 1).join('/');
    return { label: segment.replace(/-/g, ' '), href: path };
  });

  return (
    <nav aria-label="breadcrumbs">
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li>
          <Link href="/">Home</Link>
          {breadcrumbs.length > 0 && ' / '}
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href}>
            {index !== breadcrumbs.length - 1 ? (
              <>
                <Link href={crumb.href}>{crumb.label}</Link>
                {' / '}
              </>
            ) : (
              <span>{crumb.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
