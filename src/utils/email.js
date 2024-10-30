import { reportError } from '@utils';

export const trimEmail = (email) => {
  try {
    return email?.toLowerCase()?.trim();
  } catch (error) {
    reportError({ error });
    return email;
  }
};
