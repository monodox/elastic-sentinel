/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    NEXT_PUBLIC_APP_NAME: 'ElasticSentinel',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
