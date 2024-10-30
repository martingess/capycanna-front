import { reportError } from '@utils';

export const byDay = (price, period = { count: 1, type: 'month' }) => {
  try {
    let days = {
      day: period.count,
      week: period.count * 7,
      month: period.count * 30,
      year: period.count * 365,
    }[period.type];
    const pricePerDay = price / days;
    return Math.round(pricePerDay * 100) / 100;
  } catch (error) {
    reportError({ error });
    return price;
  }
};

export const addedZero = (price) => {
  try {
    return `${price}`.includes('.') ? price : `${price}.00`;
  } catch (error) {
    reportError({ error });
    return price;
  }
};
