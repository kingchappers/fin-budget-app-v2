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
        build: {
            target: "es2022"
        },
        esbuild: {
            target: "es2022"
        },
        optimizeDeps: {
            esbuildOptions: {
                target: "es2022",
            }
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