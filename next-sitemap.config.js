/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://heisortland.vercel.app",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/api/*", "/logg-inn", "/registrer"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/logg-inn", "/registrer"],
      },
    ],
    additionalSitemaps: ["https://heisortland.vercel.app/sitemap.xml"],
  },
  additionalPaths: async () => {
    const staticPaths = [
      { loc: "/", changefreq: "hourly", priority: 1.0 },
      { loc: "/arrangementer", changefreq: "daily", priority: 0.9 },
      { loc: "/kategorier", changefreq: "weekly", priority: 0.8 },
      { loc: "/steder", changefreq: "weekly", priority: 0.8 },
      { loc: "/kart", changefreq: "weekly", priority: 0.7 },
      { loc: "/legg-til", changefreq: "monthly", priority: 0.6 },
      { loc: "/ny-i-sortland", changefreq: "monthly", priority: 0.6 },
    ];

    return staticPaths.map((p) => ({
      loc: p.loc,
      changefreq: p.changefreq,
      priority: p.priority,
      lastmod: new Date().toISOString(),
    }));
  },
};
