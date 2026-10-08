import type { MetadataRoute } from 'next'

/**
 * Web app manifest — lets customers "Add to Home Screen" and open Glamm
 * full-screen like an app, without the browser's address bar.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Glamm Hair Extensions',
    short_name: 'Glamm',
    description: 'Premium 100% virgin human hair extensions. Wavy, straight, curly styles & HD closures.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    categories: ['shopping', 'beauty'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Shop', url: '/shop' },
      { name: 'Cart', url: '/cart' },
      { name: 'Track Order', url: '/track-order' },
    ],
  }
}
