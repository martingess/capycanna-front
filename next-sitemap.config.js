module.exports = {
  siteUrl: 'https://capycanna.com',

  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/payment-status'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    additionalSitemaps: [
      `https://capycanna.com/sitemap.xml`,
      `https://capycanna.com/sitemap-0.xml`,
    ],
  },
  additionalPaths: async () => [],

  images: true,
};
