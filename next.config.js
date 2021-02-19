const withImages = require('next-images');

const { nextI18NextRewrites } = require('next-i18next/rewrites');

const withNextI18NextRewrites = ({ localeSubpaths = {}, ...nextConfig } = {}) => {
  return Object.assign({}, nextConfig, {
    rewrites: async () => [
      ...(nextConfig.rewrites ? await nextConfig.rewrites() : []),
      ...nextI18NextRewrites(localeSubpaths)
    ],
    publicRuntimeConfig: Object.assign({}, nextConfig.publicRuntimeConfig, {
      localeSubpaths
    }),
  });
}

const backendURL = process.env.VERCEL_GIT_COMMIT_REF === 'subscription'
  && process.env.NEXT_PUBLIC_BACKEND_URL_SUBSCRIPTION
  || process.env.NEXT_PUBLIC_BACKEND_URL;

module.exports = withNextI18NextRewrites({
  localeSubpaths: {},
  ...withImages({
    rewrites: async () => [
      {
        source: '/api/:path*',
        destination: `${backendURL}/:path*`,
      },
    ],
  }),
});
