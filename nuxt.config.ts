// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      }
  },

  nitro: {
      plugins: ["~/server/plugins/mongodb.ts"],
  },

  runtimeConfig: {
      mongodbUri:'',
  },

  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  compatibilityDate: "2024-07-27"
})