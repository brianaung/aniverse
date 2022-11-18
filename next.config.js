/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // setting this to true cause issues with hls.js (syntax error)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gogocdn.net'
        // port: '',
        // pathname: '/cover/**',
      },
      {
        protocol: 'https',
        hostname: 'i.animepahe.ru'
        // port: '',
        // pathname: '/cover/**',
      },
      {
        protocol: 'https',
        hostname: 's4.anilist.co'
        // port: '',
        // pathname: '/cover/**',
      }
    ]
  }
}

module.exports = nextConfig
