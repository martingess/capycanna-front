import * as yup from 'yup';

export const yourDatavalidationSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  surname: yup
    .string()
    .required('Surname is required')
    .min(2, 'Surname must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phonePrefix: yup.string().required().nullable(),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?\d{10,15}$/, 'Invalid phone number format (e.g. +1234567890)'),
  companyName: yup.string().nullable(),
  cin: yup.string().nullable(),
  vatNumber: yup.string().nullable(),
  country: yup.string().nullable().required('Country is required'),
  city: yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  street: yup
    .string()
    .required('Street is required')
    .min(2, 'Street must be at least 2 characters'),
  houseNumber: yup.string().required('House number is required'),
  apartmentNumber: yup.string().nullable(),
  zipCode: yup.string().required('ZIP code is required'),
  fullName: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  extraCountry: yup.string().nullable().required('Country is required'),
  extraCity: yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  extraStreet: yup
    .string()
    .required('Street is required')
    .min(2, 'Street must be at least 2 characters'),
  extraHouseNumber: yup.string().required('House number is required'),
  extraApartmentNumber: yup.string().nullable(),
  extraZipCode: yup.string().required('ZIP code is required'),
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
