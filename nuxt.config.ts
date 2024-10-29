// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    //   devtools: { enabled: true },
    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        }
    },

    nitro: {
    },

    vite: {
        esbuild: {
            supported: {
                'top-level-await': true
            },
        },
    },

    modules: [
        "@nuxt/ui",
        "@nuxt/image",
        "@pinia/nuxt",
        "@nuxt/devtools"
    ],

    compatibilityDate: "2024-07-27"
})