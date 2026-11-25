import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  title: "Nyves.nl",

  compatibilityDate: "2025-12-01",
  future: {
    compatibilityVersion: 5,
  },

  experimental: {
    // Nuxt 4.6.2+ defaults `nitroAutoImports` to false when compatibilityVersion >= 5,
    // which drops the #imports preset that @nuxtjs/i18n's server runtime imports from.
    // Without this the Nitro build fails with:
    //   "useRuntimeConfig" is not exported by "virtual:#imports"
    nitroAutoImports: true,
  },

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  app: {
    head: {
      // Static fallbacks; the title, description and og tags are overridden per
      // locale in layouts/default.vue and per page via useSeoMeta().
      meta: [
        { property: 'og:type', content: 'website' },
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
      },
      tijdlijn: {
        nl: '/tijdlijn',
        en: '/timeline'
      },
      'profielen-uit-de-nostrverse-en-fediverse' : {
        nl: '/profielen-uit-de-nostrverse-en-fediverse',
        en: '/profiles-from-the-nostrverse-and-fediverse'
      },
      'blog-verschil-tussen-nyves-en-hyves': {
        nl: '/blog/verschil-tussen-nyves-en-hyves',
        en: '/blog/difference-between-nyves-and-hyves'
      },
      'blog-hoe-zet-ik-mijn-oude-hyves-profiel-terug': {
        nl: '/blog/hoe-zet-ik-mijn-oude-hyves-profiel-terug',
        en: '/blog/how-do-i-restore-my-old-hyves-profile'
      },
      'blog-hoe-bekijk-ik-mijn-oude-hyves-profiel': {
        nl: '/blog/hoe-bekijk-ik-mijn-oude-hyves-profiel',
        en: '/blog/how-do-i-view-my-old-hyves-profile'
      },
      'blog-hoe-vind-je-jouw-hyves-gebruikersnaam': {
        nl: '/blog/hoe-vind-je-jouw-hyves-gebruikersnaam',
        en: '/blog/how-do-you-find-your-hyves-username'
      },
      'blog-hoe-verwijder-ik-mijn-hyves-profiel': {
        nl: '/blog/hoe-verwijder-ik-mijn-hyves-profiel',
        en: '/blog/how-do-i-delete-my-hyves-profile'
      },
      'blog-hoe-maak-ik-een-nieuw-profiel': {
        nl: '/blog/hoe-maak-ik-een-nieuw-profiel',
        en: '/blog/how-do-i-create-a-new-profile'
      },
      'blog-waarom-de-herstart-van-hyves-zinloos-is': {
        nl: '/blog/waarom-de-herstart-van-hyves-zinloos-is',
        en: '/blog/why-the-hyves-restart-is-pointless'
      },
      'blog-een-fediverse-account-tonen-in-nyves': {
        nl: '/blog/een-fediverse-account-tonen-in-nyves',
        en: '/blog/showing-a-fediverse-account-in-nyves'
      },
      'nostr-search': {
        nl: '/nostr/zoeken',
        en: '/nostr/search'
      },
      // Dynamic profile routes (the index page defines its own paths)
      'profiel-id-blog': {
        nl: '/profiel/[id]/blog',
        en: '/profile/[id]/blog'
      },
      'profiel-id-media': {
        nl: '/profiel/[id]/media',
        en: '/profile/[id]/media'
      },
      'profiel-id-meer': {
        nl: '/profiel/[id]/meer',
        en: '/profile/[id]/more'
      },
      'profiel-id-over': {
        nl: '/profiel/[id]/over',
        en: '/profile/[id]/about'
      },
      'profiel-id-vrienden': {
        nl: '/profiel/[id]/vrienden',
        en: '/profile/[id]/friends'
      },
      'profiel-id': {
        nl: '/profiel/[id]',
        en: '/profile/[id]'
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