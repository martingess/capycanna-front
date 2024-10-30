import cn from 'classnames';
import styles from './Footer.module.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { IconMail } from '@UI';

const Footer = () => {
  const t = useTranslations('footer');
  return (
    <footer className={styles['footer']}>
      <div className={cn('wrapper', styles['footer__wrapper'])}>
        <div className={styles['footer__policy']}>
          <Link href={'/cookie-policy'} className={styles['footer__link']} target="_blank">
            {t('cookiePolicy')}
          </Link>
          <Link href={'/terms-of-use'} className={styles['footer__link']} target="_blank">
            {t('termsOfUse')}
          </Link>
          <Link href={'/privacy-policy'} className={styles['footer__link']} target="_blank">
            {t('privacyPolicy')}
          </Link>
          <Link href={'/subscription-terms'} className={styles['footer__link']} target="_blank">
            {t('subscriptionTerms')}
          </Link>
        </div>
        <div className={styles['footer__contact']}>
          <Link
            href={'mailto:support@risemee.com'}
            target="_blank"
            className={styles['footer__link']}
          >
            <IconMail className={styles['footer__link-icon']} />
            <span>{t('contactUs')}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
