import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        globIgnores: [
          '**/assets/og/*.png',
          '**/feedback-*.js',
          '**/request-*.js',
          '**/conflict-*.js',
          '**/pitch-*.js',
          '**/difficult-news-*.js',
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /\/(feedback|request|conflict|pitch|difficult-news)-[a-zA-Z0-9_-]+\.js$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'coaching-cards',
              expiration: { maxEntries: 10, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: /\/assets\/og\/.+\.png$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'og-images',
              expiration: { maxEntries: 20, maxAgeSeconds: 90 * 24 * 60 * 60 },
            },
          },
        ],
      },
      manifest: {
        name: 'ClearTalk',
        short_name: 'ClearTalk',
        description: 'Coaching for the person and the moment',
        id: '/',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        background_color: '#faf8f5',
        theme_color: '#2c2926',
        categories: ['lifestyle', 'productivity'],
        icons: [
          { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/assets/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
});
