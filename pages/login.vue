<script setup lang="ts">
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from 'aws-amplify';
// import awsconfig from '~/src/aws-exports.js';

// Review the below for info on how to configure the aws-exports file - "Configure the user pool" section
//https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/authenticate-react-app-users-cognito-amplify-ui.html

//The cognito part is add in the exports which isn't being produced, how to I produce this with the settings that I need/want?

// https://ui.docs.amplify.aws/vue/connected-components/authenticator/customization#headers--footers
// if (process.env.NUXT_PUBLIC_AMPLIFY_TEST === undefined) {

if (process.env.NUXT_PUBLIC_AMPLIFY_TEST === undefined) {
  // console.log("NUXT_PUBLIC_AMPLIFY_TEST: " + process.env.NUXT_PUBLIC_AMPLIFY_TEST);
  // console.log("AMPLIfy_TEST:" + process.env.AMPLIFY_TEST);
  // console.log("VUE_APP_AMPLIFY_TEST: ", process.env.VUE_APP_AMPLIFY_TEST);
  console.log("VITE Variable: ", import.meta.env.VITE_AMPLIFY_TEST)
  // console.log("VITE Variable2: ", process.env.VITE_AMPLIFY_TEST)


  throw new Error("Missing TEST environment variable");
} else {
  console.log("TEST environment variable is set to:", process.env.NUXT_PUBLIC_AMPLIFY_TEST);
}
if (process.env.AMPLIFY_COGNITO_USER_POOL_ID === undefined) {
  throw new Error("Missing COGNITO_USER_POOL_ID environment variable");
}

if (process.env.COGNITO_USER_POOL_CLIENT_ID === undefined) {
  throw new Error("Missing COGNITO_USER_POOL_CLIENT_ID environment variable");
}
if (process.env.COGNITO_IDENTITY_POOL_ID === undefined) {
  throw new Error("Missing COGNITO_IDENTITY_POOL_ID environment variable");
}

Amplify.configure({
    Auth: {
    Cognito: {
      userPoolId: process.env.AMPLIFY_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID, 
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
});
const auth = useAuthenticator()
</script>

<template>
    <main>
        <authenticator>
            <template v-slot="{ user, signOut }">
                <h1 class="text-4xl font-extrabold">Welcome {{ user.signInDetails.loginId }}!</h1>
                <p class="my-5">This is your account screen. There's not much to put here right now, but I'm sure I'll
                    think of something to add eventually.</p>
                <!-- <button @click="signOut">Sign Out</button> -->
                <UButton icon="i-heroicons-arrow-left-start-on-rectangle" class="my-5 bg-red-600 hover:bg-red-700"
                    @click="signOut">Sign Out</UButton>
            </template>
        </authenticator>
        <!-- <template v-if="auth.route === 'authenticated'">
            <h1>Hello {{ auth.user?.username }}!</h1>
            <button @click="auth.signOut">Sign out</button>
        </template> -->
    </main>
</template>