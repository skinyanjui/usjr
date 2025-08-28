/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep builds strict to surface issues in CI
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  // Ensure modern output for supported browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/icons/{{member}}',
    },
    'date-fns': {
      transform: 'date-fns/{{member}}',
    },
  },
  env: {
    NEXT_PUBLIC_GMAPS_API_KEY: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
  },
}

export default nextConfig
