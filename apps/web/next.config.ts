import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // @ts-ignore - In Next.js 16 this might be top level or experimental key changed
  allowedDevOrigins: ['192.168.0.119', '192.168.0.119:3001']
}

export default nextConfig
