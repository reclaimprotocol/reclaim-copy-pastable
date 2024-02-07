/** @type {import('next').NextConfig} */

const fs = require("fs");
const withPWA = require("next-pwa");


const nextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})({
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  swcMinify: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
});

module.exports = nextConfig;
