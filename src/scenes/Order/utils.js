import * as yup from 'yup';

export const getValidationSchema = (t) => yup.object().shape({
  name: yup.string().required(t('personalInfo.validationErrors.name')).min(2, 'Name must be at least 2 characters'),
  surname: yup
    .string()
    .required(t('personalInfo.validationErrors.surname'))
    .min(2, 'Surname must be at least 2 characters'),
  email: yup.string().required(t('personalInfo.validationErrors.email')).email('Invalid email format'),
  phonePrefix: yup.mixed().notRequired().nullable(),
  phone: yup
    .string()
    .required(t('personalInfo.validationErrors.phone'))
    .matches(/^\d{9,14}$/, 'Invalid phone number format (e.g. +123456789012)'),
  companyName: yup.string().nullable(),
  cin: yup.string().nullable(),
  vatNumber: yup.string().nullable(),
  country: yup.string().nullable().required(t('personalInfo.validationErrors.country')),
  city: yup.string().required(t('personalInfo.validationErrors.city')).min(2, 'City must be at least 2 characters'),
  street: yup
    .string()
    .required(t('personalInfo.validationErrors.street'))
    .min(2, 'Street must be at least 2 characters'),
  houseNumber: yup
    .number()
    .typeError(t('personalInfo.validationErrors.house'))
    .required(t('personalInfo.validationErrors.house')),
  apartmentNumber: yup
    .string()
    .nullable()
    .test('is-valid-apartment-number', t('personalInfo.validationErrors.apartment'), (value) => {
      if (!value) return true;
      return /^\d+$/.test(value);
    }),
  zipCode: yup
    .string()
    .required(t('personalInfo.validationErrors.zip'))
    .matches(/^\d+$/, t('personalInfo.validationErrors.zip')),
  // fullName: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  extraCountry: yup
    .string()
    .nullable()
    .required('Country is required')
    .when('$toAnotherAddress', {
      is: true,
      then: (schema) => schema.required('Country is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  extraCity: yup
    .string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .when('$toAnotherAddress', {
      is: true,
      then: (schema) =>
        schema.required('City is required').min(2, 'City must be at least 2 characters'),
      otherwise: (schema) => schema.notRequired(),
    }),
  extraStreet: yup
    .string()
    .required('Street is required')
    .min(2, 'Street must be at least 2 characters')
    .when('$toAnotherAddress', {
      is: true,
      then: (schema) =>
        schema.required('Street is required').min(2, 'Street must be at least 2 characters'),
      otherwise: (schema) => schema.notRequired(),
    }),
  extraHouseNumber: yup
    .string()
    .required('House number is required')
    .when('$toAnotherAddress', {
      is: true,
      then: (schema) => schema.required('House number is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  extraApartmentNumber: yup
    .string()
    .nullable()
    .test('is-valid-apartment-number', 'Apartment number must contain only numbers', (value) => {
      if (!value) return true;
      return /^\d+$/.test(value);
    })
    .when('$toAnotherAddress', {
      is: true,
      then: (schema) => schema,
      otherwise: (schema) => schema.notRequired(),
    }),
  extraZipCode: yup
    .string()
    .required('ZIP code is required')
    .when('$toAnotherAddress', {
      is: true,
      then: (schema) => schema.required('ZIP code is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const countries = ['USA', 'Germany', 'France', 'UK', 'Spain'];

export const cities = {
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Germany: ['Berlin', 'Munich', 'Hamburg'],
  France: ['Paris', 'Lyon', 'Marseille'],
  UK: ['London', 'Manchester', 'Birmingham'],
  Spain: ['Madrid', 'Barcelona', 'Valencia'],
};

export const phonePrefixes = [
  {
    id: 1,
    title: 'Germany',
    prefix: '+123',
    flag: '/images/order/uk-flag.svg',
  },
  {
    id: 2,
    title: 'France',
    prefix: '+456',
    flag: '/images/order/uk-flag.svg',
  },
  {
    id: 3,
    title: 'UK',
    prefix: '+789',
    flag: '/images/order/uk-flag.svg',
  },
];

export const getDeliveryMethods = (t) => [
  {
    id: 1,
    title: t('payment.deliveryMethods.postOffice'),
    price: '2 - 8 €',
  },
  {
    id: 2,
    title: t('payment.deliveryMethods.courier'),
    price: '12 - 18 €',
  },
  {
    id: 3,
    title: t('payment.deliveryMethods.meest'),
    price: '10 - 15 €',
  },
];

export const getPaymentMethods = (t) => [
  {
    id: 1,
    title: t('payment.paymentMethods.receipt'),
  },
  {
    id: 2,
    title: t('payment.paymentMethods.google'),
  },
  {
    id: 3,
    title: t('payment.paymentMethods.apple'),
  },
];

export const getVatValue = (price) => {
  const vat = 0.21;
  return (price * vat).toFixed(2);
};
