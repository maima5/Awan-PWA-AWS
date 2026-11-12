import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Dokumentasi plugin PWA: https://vite-pwa-org.netlify.app/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'PWA AWS App', // TODO: ganti dengan nama aplikasi
        short_name: 'PWA AWS',
        description: 'Progressive Web App - Tugas Besar Komputasi Awan',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Semua file hasil build di-cache supaya app tetap bisa dibuka saat offline
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            // Request ke backend: coba network dulu, kalau offline pakai data dari cache
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 }
            }
          }
        ]
      },
      devOptions: {
        enabled: false // ubah ke true kalau mau tes service worker saat `npm run dev`
      }
    })
  ],
  server: {
    port: 5173
  }
})
