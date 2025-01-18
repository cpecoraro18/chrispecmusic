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
        { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" },
        { src: "https://kit.fontawesome.com/d05f769d21.js", crossorigin: "anonymous" },
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MFS3DSBM');`,
          type: 'text/javascript',
        },
      ],
      noscript: [
        {
          children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFS3DSBM"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ]
    }
  },
})
