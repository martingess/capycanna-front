import cn from 'classnames';
import styles from './Footer.module.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { IconInstagram, IconWhatsapp, IconTelegram, IconPhone, IconMail } from '@UI';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useEffect } from 'react';
// import { withStyledToast } from '@utils';

const Footer = () => {
  const t = useTranslations('footer');

  // useEffect(() => {
  //   withStyledToast('success', 'Успешно!', 'Операция прошла успешно.');
  // }, []);

  return (
    <footer className={styles['footer']}>
      <div className={cn('wrapper', styles['footer__wrapper'])}>
        <div className={styles['footer__top']}>
          <div className={styles['footer__links']}>
            <div className={styles['footer__links-set']}>
              <Link href={'/vape'} className={styles['footer__link']}>
                {t('links.vape')}
              </Link>
              <Link href={'/cartridge'} className={styles['footer__link']}>
                {t('links.cartridge')}
              </Link>
              <Link href={'/flowers'} className={styles['footer__link']}>
                {t('links.flowers')}
              </Link>
              <Link href={'/hash'} className={styles['footer__link']}>
                {t('links.hash')}
              </Link>
              <Link href={'/jelly'} className={styles['footer__link']}>
                {t('links.jelly')}
              </Link>
            </div>
            <div className={styles['footer__links-set']}>
              <Link href={'/distilate'} className={styles['footer__link']}>
                {t('links.distilate')}
              </Link>
              <Link href={'/oil'} className={styles['footer__link']}>
                {t('links.oil')}
              </Link>
              <Link href={'/tea'} className={styles['footer__link']}>
                {t('links.tea')}
              </Link>
              <Link href={'/cosmetics'} className={styles['footer__link']}>
                {t('links.cosmetics')}
              </Link>
              <Link href={'/accessories'} className={styles['footer__link']}>
                {t('links.accessories')}
              </Link>
            </div>
            <div className={styles['footer__links-set']}>
              <Link href={'/merch'} className={styles['footer__link']}>
                {t('links.merch')}
              </Link>
              <Link href={'/hhc'} className={styles['footer__link']}>
                {t('links.hhc')}
              </Link>
              <Link href={'/cbd'} className={styles['footer__link']}>
                {t('links.cbd')}
              </Link>
              <Link href={'/h4cbd'} className={styles['footer__link']}>
                {t('links.h4cbd')}
              </Link>
              <Link href={'/hhc-p'} className={styles['footer__link']}>
                {t('links.hhc-p')}
              </Link>
            </div>
            <div className={styles['footer__links-set']}>
              <Link href={'/light'} className={styles['footer__link']}>
                {t('links.light')}
              </Link>
              <Link href={'/everage'} className={styles['footer__link']}>
                {t('links.everage')}
              </Link>
              <Link href={'/strong'} className={styles['footer__link']}>
                {t('links.strong')}
              </Link>
              <Link href={'/starter-pack'} className={styles['footer__link']}>
                {t('links.starterPack')}
              </Link>
              <Link href={'/for-health'} className={styles['footer__link']}>
                {t('links.forHealth')}
              </Link>
            </div>
            <div className={styles['footer__links-set']}>
              <Link href={'/for-sleeping'} className={styles['footer__link']}>
                {t('links.forSleeping')}
              </Link>
              <Link href={'/pain'} className={styles['footer__link']}>
                {t('links.pain')}
              </Link>
              <Link href={'/wholesale'} className={styles['footer__link']}>
                {t('links.wholesale')}
              </Link>
              <Link href={'/affiliate-program'} className={styles['footer__link']}>
                {t('links.affiliateProgram')}
              </Link>
              <Link href={'/shipping-and-payment'} className={styles['footer__link']}>
                {t('links.shippingAndPayment')}
              </Link>
            </div>
            <div className={styles['footer__links-set']}>
              <Link href={'/bonus-program'} className={styles['footer__link']}>
                {t('links.bonusProgram')}
              </Link>
              <Link href={'/blog'} className={styles['footer__link']}>
                {t('links.blog')}
              </Link>
              <Link href={'/contact-us'} className={styles['footer__link']}>
                {t('links.contactUs')}
              </Link>
            </div>
          </div>
          <div className={styles['contact']}>
            <div className={styles['contact__data']}>
              <a href="tel:+420725444643" className={styles['contact__link']}>
                <IconPhone />
                <span>+42 (072) 54-44-643</span>
              </a>
              <a href="mailto:email@emailemail.com" className={styles['contact__link']}>
                <IconMail />
                <span>email@emailemail.com</span>
              </a>
              <div className={styles['contact__socials']}>
                <a href="https://www.facebook.com/" className={styles['contact__social']}>
                  <IconInstagram />
                </a>
                <a href="https://www.instagram.com/" className={styles['contact__social']}>
                  <IconWhatsapp />
                </a>
                <a href="https://www.youtube.com/" className={styles['contact__social']}>
                  <IconTelegram />
                </a>
              </div>
            </div>
            <div className={styles['subscription']}>
              <div className={styles['subscription__title']} dangerouslySetInnerHTML={{ __html: t.raw('subscription.title') }} />
              <TextField
                variant="outlined"
                placeholder="email@gmail.com"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px !important',
                    backgroundColor: '#fff',
                    outline: '1px solid rgba(34, 27, 21, 0.20)',
                    paddingRight: '0',
                    height: '40px',
                    paddingLeft: '5px',
                    overflow: 'hidden',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#221B15',
                    opacity: 0.5,
                    fontSize: '12px',
                  },
                }}
                InputProps={{
                  style: {
                    borderRadius: '8px !important',
                    paddingRight: '0',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        style={{
                          backgroundColor: '#b8432b',
                          borderRadius: '0 8px 8px 0',
                          padding: '11px 11px',
                        }}
                      >
                        <ArrowForwardIosIcon style={{ color: '#fff', width: '16px' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles['policy']}>
          <div className={styles['policy__item']}>
            <Link href={'/terms-and-conditions'} className={styles['policy__link']}>
              {t('termsAndConditions')}
            </Link>
          </div>
          <div className={styles['policy__item']}>
            <Link href={'/privacy-policy'} className={styles['policy__link']}>
              {t('privacyPolicy')}
            </Link>
          </div>
          <div className={styles['policy__item']}>
            <Link href={'/refund-policy'} className={styles['policy__link']}>
              {t('refundPolicy')}
            </Link>
          </div>
          <div className={styles['policy__item']}>
            <Link href={'/cookie-policy'} className={styles['policy__link']}>
              {t('cookiePolicy')}
            </Link>
          </div>
          <div className={styles['policy__item']}>
            <Link href={'/about-us'} className={styles['policy__link']}>
              {t('aboutUs')}
            </Link>
          </div>
          <div className={styles['policy__item']}>
            <Link href={'/analysis'} className={styles['policy__link']}>
              {t('analysis')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
