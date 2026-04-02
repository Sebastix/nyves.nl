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
      title: "Nyves"
    }
  },

  devtools: { enabled: true },

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