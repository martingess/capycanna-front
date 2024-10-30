import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ButtonCO, IconSecure, IconCheckbox, IconGift } from '@UI';
import { byDay, gaEventDispatch } from '@utils';
import clsx from 'clsx';
import styles from './Plans.module.scss';

const Plans = ({ plan, handlePlan, plans, handleSubmit, translations }) => {
  const t = useTranslations(translations);
  const activePlan = plans.find(({ code }) => code === plan);
  const changePlan = (code, event) => () => {
    handlePlan(code);
    gaEventDispatch({ event });
  };
  return (
    <div className={styles['plans']}>
      <h2>{t('title')}</h2>
      <div className={styles['plans_list']}>
        {plans?.map(({ code, period, price, oldPrice, currencySymbol, discount, label }) => {
          const name = t(`${period.count}${period.type}`);
          const perDay = oldPrice ? byDay(oldPrice, period) : null;
          const perDayDiscount = byDay(price, period);
          const firstPrice = perDayDiscount.toString().split('.')[0];
          const secondPrice = perDayDiscount.toString().split('.')[1];
          const event = `${period.count}${period.type?.slice(0, 1)}_click`;
          return (
            <div
              key={code}
              className={clsx(styles['plans_item'], {
                [styles['isSelected']]: plan === code,
              })}
              onClick={changePlan(code, event)}
            >
              {label ? <div className={styles['plans_label']}>{t(label)}</div> : null}
              <div className={styles['plans_content']}>
                <div className={styles['plans_info']}>
                  <p className={styles['plans_name']}>{name}</p>
                  <div className={styles['plans_move']}>
                    {discount?.promoPercent ? (
                      <div className={styles['plans_info-discount']}>
                        <IconGift /> {t('save')} {discount?.promoPercent}%
                      </div>
                    ) : (
                      <span />
                    )}
                    <p className={styles['plans_old']}>
                      {currencySymbol}
                      {perDay.toFixed(2)}
                    </p>
                  </div>
                  <div className={styles['plans_info-price']}>
                    {!!oldPrice && (
                      <>
                        <span>
                          {currencySymbol}
                          {oldPrice?.toFixed(2)}
                        </span>{' '}
                      </>
                    )}
                    {currencySymbol}
                    {price.toFixed(2)}
                  </div>
                </div>
                <div className={styles['plans_price']}>
                  <div className={styles['plans_shape']}>
                    <span>{currencySymbol}</span>
                    <p className={styles['plans_shape-split1']}>{firstPrice}</p>
                    <div className={styles['plans_shape-group']}>
                      <p className={styles['plans_shape-split2']}>
                        {`${secondPrice}`?.length === 1 ? `${secondPrice}0` : secondPrice}
                      </p>
                      <p className={styles['plans_shape-per']}>{t('perDay')}</p>
                    </div>
                  </div>
                  <div className={styles['plans_check']}>
                    <IconCheckbox />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ButtonCO disabled={!plan} onClick={handleSubmit}>
        {t('getMyPlan')}
      </ButtonCO>
      <div className={styles['secure']}>
        <div className={styles['secure_label']}>
          <IconSecure />
          <p>{t('secure')}</p>
        </div>
        <Image
          className={styles['secure_image']}
          src="/images/checkout/secure.png"
          width={311}
          height={20}
          alt="secure"
          quality={100}
        />
        <p className={styles['secure_caption']}>
          {t.rich('secureDescription', {
            b: () => (
              <b>
                {activePlan?.currencySymbol}
                {activePlan?.oldPrice?.toFixed(2)}
              </b>
            ),
          })}
        </p>
      </div>
    </div>
  );
};

export default Plans;
