import { reportError, getCookie } from '@utils';
import configs from '@configs';
const { GTAG_ID } = configs;

export const gaEventDispatch = ({ event = '', parameters = {} }) => {
  try {
    if (window?.gtag && event) {
      window.gtag('event', `${event}`, parameters);
    } else if (event) {
      if (!window?.dataLayer) {
        window.dataLayer = [];
      }
      window.dataLayer.push({
        event: `${event}`,
        ...(parameters ? parameters : {}),
      });
    } else {
      console.error(window?.gtag, window?.dataLayer);
    }
  } catch (error) {
    reportError({ error, event, parameters });
  }
};

export const fbEventDispatch = async ({ event = '', parameters = {} }, saveEvent = false) => {
  try {
    const eventId = `fbq_${Date.now()}`;
    const eventSourceUrl = `${window?.location?.origin}${window?.location?.pathname}`;
    if (window?.fbq && event) {
      window.fbq('track', `${event}`, parameters, {
        eventID: eventId,
      });
    }

    const fbClientId = getFbClientId();
    const qwertyData = getDataAnalytics();

    const response = await fetch('/back/info/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-id': 'site',
      },
      body: JSON.stringify({
        saveEvent,
        type: 'fb',
        clientId: fbClientId,
        eventName: event,
        params: {
          ...parameters,
          eventId,
          eventSourceUrl,
          qwertyData,
        },
      }),
    });
    const { error } = await response.json();
    if (error) {
      console.error('fbEventDispatch error', error);
    }
  } catch (error) {
    reportError({ error, event, parameters });
  }
};

export const getGaClientId = () => {
  try {
    let gaClientId = null;
    if (window?.gtag) {
      window.gtag('get', GTAG_ID, 'client_id', (clientId) => {
        gaClientId = clientId;
      });
    }

    if (!gaClientId) {
      const randomId = Math.floor(Math.random() * 1000000000);
      const timestamp = Math.floor(Date.now() / 1000);
      gaClientId = `${randomId}.${timestamp}`;
    }
    return gaClientId;
  } catch (error) {
    reportError({ error });
    return null;
  }
};

export const getFbClientId = () => {
  try {
    if (window?.fbq) {
      return getCookie('_fbp');
    }
    return null;
  } catch (error) {
    reportError({ error });
    return null;
  }
};

export const setDataAnalytics = (parameters = {}) => {
  try {
    const qwertyData = localStorage.getItem('qwertyData')
      ? JSON.parse(localStorage.getItem('qwertyData'))
      : {};

    const data = {
      ...qwertyData,
      ...parameters,
    };
    localStorage.setItem('qwertyData', JSON.stringify(data));
  } catch (error) {
    reportError({ error });
    return null;
  }
};

export const getDataAnalytics = () => {
  try {
    return localStorage.getItem('qwertyData') ? JSON.parse(localStorage.getItem('qwertyData')) : {};
  } catch (error) {
    reportError({ error });
    return {};
  }
};
