// https://nuxt.com/docs/api/configuration/nuxt-config
import topLevelAwait from "vite-plugin-top-level-await";

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

    plugins: [
        topLevelAwait({
            // The export name of top-level await promise for each chunk module
            promiseExportName: "__tla",
            // The function to generate import names of top-level await promise in each chunk module
            promiseImportName: i => `__tla_${i}`
        })
    ],

    compatibilityDate: "2024-07-27"
})