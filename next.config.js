const withImages = require('next-images');

const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {};

module.exports = {
  ...withImages(),
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  experimental: {
    async redirects() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.BACKEND_URL}/:path*`,
          permanent: false,
        },
      ];
    },
  },
};
