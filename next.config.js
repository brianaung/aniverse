/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // setting this to true cause issues with hls.js (syntax error)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'artworks.thetvdb.com'
        // port: '',
        // pathname: '/cover/**',
      },
      {
        protocol: 'https',
        hostname: 's4.anilist.co'
        // port: '',
        // pathname: '/cover/**',
      },
      {
        protocol: 'https',
        hostname: 'media.kitsu.io'
        // port: '',
        // pathname: '/cover/**',
      }
    ]
  }
}

module.exports = nextConfig
