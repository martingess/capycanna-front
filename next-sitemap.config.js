module.exports = {
  siteUrl: 'https://capycanna.com',

  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 10000,
  generateIndexSitemap: false,
  exclude: ['/404', '/500'],
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
