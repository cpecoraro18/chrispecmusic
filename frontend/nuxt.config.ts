// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Adjusting entry and chunk file names for JS files
          entryFileNames: 'assets/[name]-[hash].js',  // Main JS file
          chunkFileNames: 'assets/[name]-[hash].js',  // Chunk JS files
        }
      }
    }
  },
  app: {
    buildAssetsDir: 'assets',
    head: {
      title: 'Chris Pecoraro - Chicago Bass Player',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"},
      ],
      script: [
        { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" }
      ]
    }
  },
})
