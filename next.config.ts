import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tile.openstreetmap.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tilecache.rainviewer.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect old /evidence/library to new /evidence/documents
      {
        source: '/evidence/library',
        destination: '/evidence/documents',
        permanent: true,
      },
      // Redirect old library document routes to new documents routes
      {
        source: '/evidence/library/treaty-of-holston-1791',
        destination: '/evidence/documents/treaty-holston-1791',
        permanent: true,
      },
      {
        source: '/evidence/library/washington-to-knox-1790',
        destination: '/evidence/documents/washington-to-knox-1790-08',
        permanent: true,
      },
      {
        source: '/evidence/library/washington-proclamation-1791',
        destination: '/evidence/documents/washington-proclamation-1791',
        permanent: true,
      },
      {
        source: '/evidence/library/jefferson-to-blount-1790',
        destination: '/evidence/documents/blount-commission-1790',
        permanent: true,
      },
      {
        source: '/evidence/library/cherokee-treaty-signatories',
        destination: '/evidence/documents/treaty-holston-1791',
        permanent: true,
      },
      // Catch-all redirect for any other library slugs to documents
      {
        source: '/evidence/library/:slug',
        destination: '/evidence/documents/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
