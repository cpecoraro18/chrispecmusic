import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { generateSitemap } from './scripts/generate-sitemap.mjs'

const rootDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  css: ['~/styles/main.css'],
  hooks: {
    // Rebuild public/sitemap.xml from the pages directory on every build. The
    // previous sitemap was maintained by hand and had drifted badly — it listed
    // /bio and /services, which 404, and omitted five real pages. Deriving it
    // from the filesystem means adding a page is enough to list it.
    // Lives here rather than in an npm script because CI invokes
    // `npx nuxi generate` directly, which would skip package.json scripts.
    'build:before': () => {
      const routes = generateSitemap(
        resolve(rootDir, 'pages'),
        resolve(rootDir, 'public/sitemap.xml')
      )
      console.info(`[sitemap] wrote ${routes.length} routes to public/sitemap.xml`)
    },
  },
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
      // Screen readers need this to pick a pronunciation; Nuxt does not set it.
      htmlAttrs: { lang: 'en' },
      title: 'Chris Pecoraro | Remote Session Bass Player, Chicago',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Remote session bass player based in Chicago. Upright and electric bass recorded in my studio and delivered mix-ready.'
        },
        { name: 'author', content: 'Chris Pecoraro' },
        { name: 'theme-color', content: '#426075' },
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
