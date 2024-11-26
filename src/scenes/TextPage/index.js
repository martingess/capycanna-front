import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
import styles from './TextPage.module.scss';

const TextPage = ({ translation }) => {
  const t = useTranslations(translation);
  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['text']}>
        <div className={styles['text__wrapper']}>
          <Breadcrumbs />
          <div className={styles['text__content']}>
            <h1>В2В wholesale</h1>
            <h3>Join us and let`s create something amazing together</h3>
            <p>
              Are you a content creator with a thriving Instagram, blog, or YouTube channel? Are you
              an influencer looking for a partnership that aligns with your values? Look no further!
              Join us and let`s create something amazing together. Wondering who we`re looking for?
            </p>
            <p>
              We`re seeking individuals who share our passion for cannabis and appreciate the finer
              things in life – from savoring delightful cuisine to being a CBD advocate. If you`re
              someone who loves exploring new destinations, staying ahead of the curve on trends,
              and prioritizes a health-conscious lifestyle, you`re exactly who we`re looking for.
            </p>
            <p>
              Moreover, if you have an engaged audience that values high-quality products, then our
              collaboration is bound to resonate with them. Together, we`ll create content that not
              only captivates but also adds value to your community. Join us in spreading the joy of
              a wellness-centered lifestyle. Let`s make an impact!
            </p>
            <h4>Advantages of wholesale cooperation with us</h4>
            <ul>
              <li>interesting wholesale prices, monthly promotions and flash sales</li>
              <li>
                as our wholesale partners, you can use text or photos from our website for product
                descriptions (subject to mutual agreement)
              </li>
              <li>
                you`ll be one of the first to know what`s new and what products we`re adding to our
                range
              </li>
            </ul>
            <h4>Do you want to become our business partner?</h4>
            <ul>
              <li>we frequently expand our product portfolio</li>
              <li>
                if you have an interesting cooperation proposal for us, you would like to meet us
                personally and discuss the possibilities, please contact us at +420 608 607 607 or
                send an e-mail
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default TextPage;
