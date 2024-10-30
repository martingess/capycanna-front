const { withSentryConfig } = require('@sentry/nextjs');
const configs = require('./config.json');
const { redirectsArray } = require('./src/redirects/index.js');
const { LOCAL_DEV, BACKEND_API, SENTRY_AUTH_TOKEN, SENTRY_DOMAIN, SENTRY_ENV } = configs;

const rewrites = async () => [
  {
    source: '/back/:path*',
    destination: `${BACKEND_API}/back/:path*`,
  },
];

const nextConfig = {
  async redirects() {
    return redirectsArray;
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  trailingSlash: false,
  sentry: {
    hideSourceMaps: true,
  },
  ...(LOCAL_DEV ? { rewrites } : {}),
};

const sentryWebpackPluginOptions = {
  org: SENTRY_ENV === 'prod' ? 'education-prod' : 'education',
  project: 'risemee-site',
  url: SENTRY_DOMAIN,
  authToken: SENTRY_AUTH_TOKEN,
  silent: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
