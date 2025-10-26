import { Amplify } from 'aws-amplify'
import { defineNuxtPlugin } from '#app'
import { fetchAuthSession } from '@aws-amplify/auth'

export default defineNuxtPlugin(async () => {
    const config = useRuntimeConfig()

    // Validate required configuration
    if (!config.public.cognitoUserPoolId) {
        console.error("Missing VITE_COGNITO_USER_POOL_ID environment variable")
        return
    }

    if (!config.public.cognitoUserPoolClientId) {
        console.error("Missing VITE_COGNITO_USER_POOL_CLIENT_ID environment variable")
        return
    }

    if (!config.public.cognitoIdentityPoolId) {
        console.error("Missing VITE_COGNITO_IDENTITY_POOL_ID environment variable")
        return
    }

    console.log('Configuring Amplify with:', {
        userPoolId: config.public.cognitoUserPoolId,
        userPoolClientId: config.public.cognitoUserPoolClientId,
        identityPoolId: config.public.cognitoIdentityPoolId
    })

    // Configure Amplify
    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolId: config.public.cognitoUserPoolId as string,
                userPoolClientId: config.public.cognitoUserPoolClientId as string,
                identityPoolId: config.public.cognitoIdentityPoolId as string,
                loginWith: {
                    email: true,
                },
                signUpVerificationMethod: "code",
                userAttributes: {
                    email: {
                        required: true,
                    },
                },
                allowGuestAccess: true,
                passwordFormat: {
                    minLength: 8,
                    requireLowercase: true,
                    requireUppercase: true,
                    requireNumbers: true,
                    requireSpecialCharacters: true,
                },
            },
        },
    }, {
        ssr: true // Enable SSR support
    })
})