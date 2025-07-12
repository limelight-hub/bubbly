/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:1420", ""],
    },
  },
}

module.exports = nextConfig
