/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos'],
  },
  experimental: {
    serverMinification: false,
  },
}

module.exports = nextConfig
