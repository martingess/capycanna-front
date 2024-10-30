const configs = require('./config.json');
const { redirectsArray } = require('./src/redirects/index.js');
const { ENV_STATE, BACKEND_API } = configs;

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
  ...(ENV_STATE !== 'prod' ? { rewrites } : {}),
};

module.exports = nextConfig;
