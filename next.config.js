/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
  experimental: {
    appDir: true,           // ✅ dùng app router
    serverActions: true,    // ✅ bật server actions
  },
}

module.exports = nextConfig
