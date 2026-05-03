/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",   // enables the tiny standalone server for Docker
};

module.exports = nextConfig;
