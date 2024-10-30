import { reportError } from '@utils';

export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(';');

  for (let i = 0; i < cookiesArray.length; i += 1) {
    let cookie = cookiesArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
};

export const setCookie = (name, value, options = {}) => {
  const params = {
    path: '/',
    ...options,
  };

  // number of days
  if (params.expirationDays) {
    params.expires = new Date(Date.now() + params.expirationDays * 864e5);
  }

  // number of minutes
  if (params.expirationMinutes) {
    params.expires = new Date(Date.now() + params.expirationMinutes * 6e4);
  }

  if (params.expires instanceof Date) {
    params.expires = params.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  Object.entries(params).forEach(([key, val]) => {
    updatedCookie += `; ${key}`;

    if (val !== true) {
      updatedCookie += `=${val}`;
    }
  });

  document.cookie = updatedCookie;
};

export const parseCookies = (cookiesString = '') => {
  try {
    const cookieArray = cookiesString.split(';');
    const cookieObject = {};
    cookieArray.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      cookieObject[name] = value;
    });
    return cookieObject;
  } catch (error) {
    reportError({ error });
    return {};
  }
};

export const deleteCookie = (name) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};
