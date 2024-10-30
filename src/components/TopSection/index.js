import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@UI';
import cn from 'classnames';
import styles from './TopSection.module.scss';

const TopSection = ({ trans }) => {
  const t = useTranslations(trans);
  const tCommon = useTranslations('common');
  return (
    <section className={styles['top']}>
      <div className={cn('wrapper', styles['top__wrapper'])}>
        <Image
          src={'/images/home/books.jpg'}
          width={456}
          height={475}
          alt="top image book"
          className={styles['top__image']}
        />
        <div className={styles['top__content']}>
          <h1 className={styles['top__title']}>{t('topSection.title')}</h1>
          <div
            className={styles['top__description']}
            dangerouslySetInnerHTML={{ __html: t.raw('topSection.description') }}
          />
          <Button href="/onboarding" outside={true}>
            {tCommon('startQuiz')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
