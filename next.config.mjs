/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001',
  },
  experimental: {
    // 启用实验性功能
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
}

export default nextConfig

