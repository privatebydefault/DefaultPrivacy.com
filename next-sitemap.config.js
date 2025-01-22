/** @type {import('next-sitemap').IConfig} */
// import ./src/config/config.json
const config = require("./src/config/config.json");

module.exports = {
  siteUrl: config.site.base_url || "https://defaultprivacy.com",
  generateRobotsTxt: true,
  outDir: './public',
};
