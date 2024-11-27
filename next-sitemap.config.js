module.exports = {
  siteUrl: 'https://capycanna.com',

  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 10000,
  generateIndexSitemap: false,
  exclude: ['/404', '/500', '/cz/500', '/de/500', '/fr/500', '/cz/404', '/de/404', '/fr/404'],
  // robotsTxtOptions: {
  //   policies: [
  //     { userAgent: '*', allow: '/' },
  //     { userAgent: 'Googlebot', allow: '/' },
  //   ],
  //   additionalSitemaps: [`https://capycanna.com/sitemap.xml`],
  // },

  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: '/' }],
  },
  additionalPaths: async () => [],

  images: true,
};
