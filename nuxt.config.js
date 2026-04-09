import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  title: "Nyves.nl",

  compatibilityDate: "2025-12-01",

  vite: {
    vue: {
      customElement: true
    },
    plugins: [
      tailwindcss()
    ]
  },

  app: {
    head: {
      title: "Welkom bij Nyves - breng jouw Hyves profiel terug tot leven",
      htmlAttrs: {
        lang: 'nl',
      },
      meta: [
        { name: 'description', content: 'Nyves heeft als doel om oude Hyves-profielen opnieuw tot leven te brengen met een moderne, open webapplicatie gebaseerd op het Nostr-protocol.' },
        // Open Graph / Social Media
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Welkom bij Nyves - breng jouw Hyves profiel terug tot leven' },
        { property: 'og:description', content: 'Nyves heeft als doel om oude Hyves-profielen opnieuw tot leven te brengen met een moderne, open webapplicatie gebaseerd op het Nostr-protocol.' },
        { property: 'og:image', content: '/ogimage.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    }
  },

  devtools: { enabled: true },

  ssr: false,

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/global.css'
  ],

  modules: [
    "@pinia/nuxt"
  ],

  nitro: {
    // https://nuxt.com/docs/4.x/getting-started/prerendering
    prerender: {
      ignore: [
        '/brand/*',
        '/profile/*'
      ],
    },
  },
})