import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import cn from 'classnames';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import {
  IconInstagram,
  IconWhatsapp,
  IconMap,
  IconTelegram,
  IconPhone,
  IconMail,
  ButtonCO,
} from '@UI';
import styles from './Contact.module.scss';

const Contact = () => {
  const t = useTranslations('contact');
  const [isLoad, setIsLoad] = useState(false);
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.name.required')),
    email: Yup.string().email(t('form.email.invalid')).required(t('form.email.required')),
    message: Yup.string().required(t('form.message.required')),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const recaptchaToken = recaptchaRef?.current?.getValue();

      if (!recaptchaToken) {
        setShowRecaptcha(true);
        return;
      }
      setIsLoad(true);

      const { name = '', email = '', requestType = '', message = '' } = values;

      const requestObj = requestTypeOptions.find((item) => item.value === requestType);

      const data = {
        brand_id: '11234839070877',
        name,
        email,
        locale,
        message,
        subject: `Request from ${DOMAIN}`,
        ...(requestObj && {
          custom_fields: [
            {
              id: requestObj?.id,
              value: requestObj?.value,
            },
          ],
        }),
      };

      const response = await fetch('/backend/event-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'x-id': `${DOMAIN}`,
          brand: `spynger`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }
      setResponseData({ status: 'success', visible: true });
      setTimeout(() => {
        setResponseData({ status: 'success', visible: false });
      }, 3000);

      resetForm();

      setShowRecaptcha(false);
    } catch (error) {
      reportError({ error });
      setIsLoad(false);
      setResponseData({ status: 'error', visible: true });
      setErrors({ submit: 'Failed to submit' });
      setTimeout(() => {
        setResponseData({ status: 'error', visible: false });
      }, 3000);
    }
    setIsLoad(false);
    setSubmitting(false);
  };
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
          <div className={styles['contact__items']}>
            <div className={styles['contact__item']}>
              <h4 className={styles['contact__item-title']}>{t('titleLeft')}</h4>
              <div className={styles['data']}>
                <a href="tel:+420725444643" className={styles['data__link']}>
                  <IconPhone />
                  <span>+42 (072) 54-44-643</span>
                </a>
                <a href="mailto:email@emailemail.com" className={styles['data__link']}>
                  <IconMail />
                  <span>email@emailemail.com</span>
                </a>
                <p className={styles['data__link']}>
                  <IconMap />
                  <span>Poland</span>
                </p>
                <div className={styles['data__socials']}>
                  <a href="https://www.facebook.com/" className={styles['data__social']}>
                    <IconInstagram />
                  </a>
                  <a href="https://www.instagram.com/" className={styles['data__social']}>
                    <IconWhatsapp />
                  </a>
                  <a href="https://www.youtube.com/" className={styles['data__social']}>
                    <IconTelegram />
                  </a>
                </div>
              </div>
              <p className={styles['contact__item-over']}>{t('over')}</p>
            </div>
            <div className={styles['contact__item']}>
              <h4 className={styles['contact__item-title']}>{t('titleRight')}</h4>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ isSubmitting, errors, touched, setFieldValue }) => {
                  return (
                    <Form className={styles['contact__form']}>
                      <div className={styles['contact__form-input']}>
                        <Field
                          name="name"
                          as={InputText}
                          className={cn(
                            styles['contact__form-element'],
                            errors.name && touched.name ? 'p-invalid' : '',
                          )}
                          placeholder={t('form.name.placeholder')}
                        />
                        {errors.name && touched.name ? (
                          <p id="name-help" className="p-error">
                            {errors.name}
                          </p>
                        ) : null}
                      </div>
                      <div className={styles['contact__form-input']}>
                        <Field
                          name="email"
                          as={InputText}
                          className={cn(
                            styles['contact__form-element'],
                            errors.email && touched.email ? 'p-invalid' : '',
                          )}
                          placeholder={t('form.email.placeholder')}
                        />
                        {errors.email && touched.email ? (
                          <p id="email-help" className="p-error">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>
                      <div className={styles['contact__form-input']}>
                        <Field
                          name="message"
                          as={InputText}
                          className={cn(
                            styles['contact__form-element'],
                            errors.message && touched.message ? 'p-invalid' : '',
                          )}
                          placeholder={t('form.message.placeholder')}
                        />
                        {errors.message && touched.message ? (
                          <p id="email-help" className="p-error">
                            {errors.message}
                          </p>
                        ) : null}
                      </div>

                      <ButtonCO
                        className={styles['contact-us__button']}
                        type={'submit'}
                        disabled={isLoad}
                      >
                        {t('form.submit')}
                      </ButtonCO>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
