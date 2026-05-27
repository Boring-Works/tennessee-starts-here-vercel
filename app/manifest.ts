import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The 1775 Almanac — Rocky Mount',
    short_name: '1775 Almanac',
    description:
      'Heritage weather intelligence for Tennessee. Task-based workability scores, planting guidance, and environmental monitoring—from where Tennessee began.',
    start_url: '/almanac',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0A1128',
    theme_color: '#0A1128',
    categories: ['weather', 'utilities', 'lifestyle'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'View Almanac',
        short_name: 'Almanac',
        url: '/almanac',
        description: 'Open the weather almanac',
      },
      {
        name: 'Plan Your Visit',
        short_name: 'Visit',
        url: '/visit',
        description: 'Plan a visit to Rocky Mount',
      },
    ],
  }
}
