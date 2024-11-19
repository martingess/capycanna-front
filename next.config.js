const configs = require('./config.json');
const { redirectsArray } = require('./src/redirects/index.js');

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
};

module.exports = nextConfig;
