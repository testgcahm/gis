import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GMC Islamic Society',
    short_name: 'GMC Islamic Society',
    description: 'A Progressive Web App for GMC Islamic Society at Gujranwala Medical College',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5d2d92',
    icons: [
      {
        src: '/logo.png',
        sizes: '500x500',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo-144.png',
        sizes: '144x144',
        type: 'image/png',
      },
    ],
  }
}