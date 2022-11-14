/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gogocdn.net',
        // port: '',
        // pathname: '/cover/**',
      },
    ],
  },
}

module.exports = nextConfig
