import * as Sentry from '@sentry/nextjs';

export const reportError = ({ error, ...props }) => {
  try {
    console.log({ error, ...props });
    Sentry.captureException(error);
  } catch (error) {
    console.log({ error, ...props });
  }
};
