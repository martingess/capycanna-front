const { redirectsArray } = require('./src/redirects/index.js');

const nextConfig = {
  async redirects() {
    return redirectsArray;
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'cz', 'de', 'fr'],
    defaultLocale: 'en',
  },
  trailingSlash: false,
};

module.exports = nextConfig;
