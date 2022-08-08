const withPWA = require("next-pwa");
const withPlugins = require("next-compose-plugins");

const isProd = process.env.NODE_ENV !== "development";
module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: !isProd,
          dest: "public",
          skipWaiting: false,
          register: false,
        },
      },
    ],
  ],
  {
    typescript: {
      ignoreDevErrors: true,
      ignoreBuildErrors: true,
    },
  }
);
