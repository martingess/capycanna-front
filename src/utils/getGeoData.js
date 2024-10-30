import { reportError } from '@utils';

export const getGeoData = async () => {
  try {
    const response = await fetch('/back/info/geo');
    const { data, error, message } = await response.json();
    if (error) {
      reportError({ error, message });
      return null;
    }

    return data;
  } catch (error) {
    reportError({ error });
    return null;
  }
};
