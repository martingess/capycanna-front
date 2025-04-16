import { useTranslations } from 'next-intl';
import styles from './Order.module.scss';
import { useState, useEffect } from 'react';
import OrderBill from '../../components/OrderBill';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { dataValidationSchema } from './utils';
import { CheckBox, Select, PhonePrefixSelect, ButtonCO } from '@UI';
import { countries, cities, phonePrefixes } from './utils';

const Payment = ({ setActiveTab, totalBasketPrice }) => {
  const t = useTranslations('order');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(dataValidationSchema),
  });
  const selectedCountry = watch('country');

  const [isCompanyDetailsOpened, setIsCompanyDetailsOpened] = useState(false);
  const [toAnotherAddress, setToAnotherAddress] = useState(false);
  const [wantRegister, setWantRegister] = useState(false);

  const [phonePrefix, setPhonePrefix] = useState(phonePrefixes[0]);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    reset();
    setActiveTab('personalInfo');
  };

  const onNextBtnClick = () => {
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    setValue('city', '');
  }, [selectedCountry, setValue]);

  const AddressForm = ({ country, city, street, houseNumber, apartmentNumber, zipCode }) => (
    <div className={styles['form']} style={{ margin: '24px 0' }}>
      <div className={styles['formGrid']}>
        <div className={styles['inputGroup']}>
          <label>{t('personalInfo.country')}</label>
          <Controller
            name={'country'}
            control={control}
            defaultValue=""
            rules={{ required: 'Country is required' }}
            render={({ field }) => (
              <Select
                {...field}
                options={countries}
                placeholder={t('personalInfo.country')}
                searchable
              />
            )}
          />
          {errors.country && <p className={styles.error}>{errors.country.message}</p>}
        </div>
        <div className={styles['inputGroup']}>
          <label>{t('personalInfo.city')}*</label>
          <Controller
            name={'city'}
            control={control}
            defaultValue=""
            rules={{ required: 'City is required' }}
            render={({ field }) => (
              <Select
                {...field}
                options={cities[selectedCountry]}
                placeholder={t('personalInfo.city')}
                searchable
              />
            )}
          />
          {errors.city && <p className={styles.error}>{errors.city.message}</p>}
        </div>
        <div className={styles['inputGroup']}>
          <label>{t('personalInfo.street')}*</label>
          <input type="text" placeholder={t('personalInfo.street')} {...register(street)} />
          {errors.street && <p className={styles.error}>{errors.street.message}</p>}
        </div>
        <div className={styles['inputGroup']}>
          <label>{t('personalInfo.house')}*</label>
          <input type="text" placeholder={t('personalInfo.house')} {...register(houseNumber)} />
          {errors.houseNumber && <p className={styles.error}>{errors.houseNumber.message}</p>}
        </div>
        <div className={styles['inputGroup']}>
          <label>{t('personalInfo.apartment')}</label>
          <input
            type="text"
            placeholder={t('personalInfo.apartment')}
            {...register(apartmentNumber)}
          />
          {errors.apartmentNumber && (
            <p className={styles.error}>{errors.apartmentNumber.message}</p>
          )}
        </div>
        <div className={styles['inputGroup']}>
          <label>{t('personalInfo.zip')}*</label>
          <input type="text" placeholder={t('personalInfo.zip')} {...register(zipCode)} />
          {errors.zipCode && <p className={styles.error}>{errors.zipCode.message}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles['main-template']}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['payment-content']}>
        {/* FORM 1 */}
        <div className={styles['form-header']}>
          <h2 className={styles['form-header__title']}>{t('personalInfo.title1')}</h2>
          <div className={styles['form-header__login']}>
            {t('personalInfo.login.haveAccount')}
            <button type="button" onClick={() => console.log('log in')}>
              {t('personalInfo.login.login')}
            </button>
          </div>
        </div>
        <div className={styles['form']}>
          <div className={styles['formGrid']}>
            <div className={styles['inputGroup']}>
              <label>{t('personalInfo.name')}*</label>
              <input type="text" placeholder={t('personalInfo.name')} {...register('name')} />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </div>

            <div className={styles['inputGroup']}>
              <label>{t('personalInfo.surname')}*</label>
              <input type="text" placeholder={t('personalInfo.surname')} {...register('surname')} />
              {errors.surname && <p className={styles.error}>{errors.surname.message}</p>}
            </div>

            <div className={styles['inputGroup']}>
              <label>{t('personalInfo.email')}*</label>
              <input type="email" placeholder={t('personalInfo.email')} {...register('email')} />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            <div className={styles['inputGroup']}>
              <label>{t('personalInfo.phone')}*</label>
              <input
                type="tel"
                placeholder={''}
                style={{ paddingLeft: '110px' }}
                {...register('phone')}
              />
              <div className={styles['phone-dropdown-wrapper']}>
                <Controller
                  name={'phonePrefix'}
                  control={control}
                  defaultValue={phonePrefixes[0]}
                  render={({ field }) => (
                    <PhonePrefixSelect
                      {...field}
                      options={phonePrefixes}
                      placeholder={phonePrefixes[0]}
                    />
                  )}
                />
              </div>
              {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
            </div>
          </div>
        </div>
        <div className={styles['form-divider']} />

        {/* FORM 2 */}
        <div className={styles['form-header']}>
          <h2 className={styles['form-header__title']}>{t('personalInfo.title2')}</h2>
        </div>
        <CheckBox
          label={t('personalInfo.companyDetails')}
          value={isCompanyDetailsOpened}
          isChecked={isCompanyDetailsOpened}
          handleSelection={() => setIsCompanyDetailsOpened(!isCompanyDetailsOpened)}
        />
        {isCompanyDetailsOpened && (
          <div className={styles['company-details-wrapper']}>
            <div className={styles['inputGroup']}>
              <label>{t('personalInfo.companyName')}</label>
              <input
                type="text"
                placeholder={t('personalInfo.companyName')}
                {...register('companyName')}
              />
            </div>

            <div className={styles['inputGroup']}>
              <label>{t('personalInfo.cin')}</label>
              <input type="text" placeholder={t('personalInfo.cin')} {...register('cin')} />
            </div>

            <div className={styles['inputGroup']}>
              <label>{t('personalInfo.vatNumber')}</label>
              <input
                type="text"
                placeholder={t('personalInfo.vatNumber')}
                {...register('vatNumber')}
              />
            </div>
          </div>
        )}
        <AddressForm
          country={'country'}
          city={'city'}
          street={'street'}
          houseNumber={'houseNumber'}
          apartmentNumber={'apartmentNumber'}
          zipCode={'zipCode'}
        />

        <CheckBox
          label={t('personalInfo.anotherAddress')}
          value={toAnotherAddress}
          isChecked={toAnotherAddress}
          handleSelection={() => setToAnotherAddress(!toAnotherAddress)}
        />
        {toAnotherAddress && (
          <AddressForm
            country={'extraCountry'}
            city={'extraCity'}
            street={'extraStreet'}
            houseNumber={'extraHouseNumber'}
            apartmentNumber={'extraApartmentNumber'}
            zipCode={'extraZipCode'}
          />
        )}
        <CheckBox
          label={t('personalInfo.wantRegister')}
          value={wantRegister}
          isChecked={wantRegister}
          handleSelection={() => setWantRegister(!wantRegister)}
        />
      </form>
      <div>
        <OrderBill
          t={t}
          summary={totalBasketPrice}
          price={totalBasketPrice}
          total={totalBasketPrice}
          onNextBtnClick={onNextBtnClick}
          onPrevBtnClick={() => setActiveTab('shoppingCart')}
        />
      </div>
      <div className={styles['next-btn-mobile']}>
        <ButtonCO theme="orange" className={styles['next-btn']} onClick={onNextBtnClick}>
          {t('shoppingCart.sidebar.continue')}
        </ButtonCO>
      </div>
    </section>
  );
};

export default Payment;
