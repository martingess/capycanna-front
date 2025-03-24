import { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const FormContext = createContext();

const validationSchema = yup.object().shape({
  country: yup.string().nullable(),
  city: yup.string().required('City is required'),
  street: yup.string().required('Street is required'),
  houseNumber: yup.string().required('House number is required'),
  apartmentNumber: yup.string().nullable(),
  zipCode: yup.string().required('ZIP code is required'),
});

export const FormProvider = ({ children }) => {
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  return <FormContext.Provider value={formMethods}>{children}</FormContext.Provider>;
};

export const useFormContextData = () => useContext(FormContext);
