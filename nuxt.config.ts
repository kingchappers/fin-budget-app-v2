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
        optimizeDeps: {
            esbuildOptions: {
                target: 'esnext'
            }
        },
        build: {
            target: 'esnext'
        }
    },

    modules: [
        "@nuxt/ui",
        "@nuxt/image",
        "@pinia/nuxt",
        "@nuxt/devtools"
    ],

    compatibilityDate: "2024-07-27"
})