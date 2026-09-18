import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  title: "Nyves.nl",

  compatibilityDate: "2025-12-01",
  future: {
    compatibilityVersion: 5,
  },

  vite: {
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
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/scripts'
  ],

  i18n: {
    // i18n module options
    baseUrl: 'https://nyves.nl',
    strategy: 'prefix_except_default',
    defaultLocale: 'nl',
    locales: [
      { code: 'nl', language: 'nl-NL', icon: '🇳🇱', name: 'Nederlands', file: 'nl.json' },
      { code: 'en', language: 'en-US', icon: '🇬🇧', name: 'English', file: 'en.json' }
    ],
    customRoutes: 'config',
    pages: {
      index: {
        nl: '/',
        en: '/'
      },
      zoek: {
        nl: '/zoek',
        en: '/search'
      },
      nieuws: {
        nl: '/nieuws',
        en: '/news'
      },
      doneer: {
        nl: '/doneer',
        en: '/donate'
      },
      'veelgestelde-vragen': {
        nl: '/veelgestelde-vragen',
        en: '/faq'
      },
      'over-nyves': {
        nl: '/over-nyves',
        en: '/about-nyves'
      },
      voorwaarden : {
        nl: '/voorwaarden',
        en: '/terms'
      }
    }
  },

  nitro: {
    // https://nuxt.com/docs/4.x/getting-started/prerendering
    prerender: {
      ignore: [

      ],
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('altcha-widget')
    }
  }
})