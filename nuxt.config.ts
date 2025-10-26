// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    //   devtools: { enabled: true },
    css: ['~/assets/css/main.css'],

    nitro: {
        esbuild: {
            options: {
                target: 'esnext'
            }
        }
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

    compatibilityDate: "2024-07-27",

    runtimeConfig: {
    public: {
      cognitoUserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      cognitoUserPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
      cognitoIdentityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID
    }
  }

})