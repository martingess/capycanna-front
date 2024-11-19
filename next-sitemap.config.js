module.exports = {
  siteUrl: 'https://capycanna.com',

  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 10000,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    additionalSitemaps: [`https://capycanna.com/sitemap.xml`],
  },
  additionalPaths: async () => [],

  images: true,
};
