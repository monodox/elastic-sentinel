import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_APP_NAME: 'ElasticSentinel',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },

  // Webpack configuration for handling certain modules
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
