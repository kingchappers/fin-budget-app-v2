<script setup lang="ts">
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from 'aws-amplify';
import awsconfig from '~/src/aws-exports.js';

// Review the below for info on how to configure the aws-exports file - "Configure the user pool" section
//https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/authenticate-react-app-users-cognito-amplify-ui.html

//The cognito part is add in the exports which isn't being produced, how to I produce this with the settings that I need/want?
Amplify.configure({
    Auth: {
    Cognito: {
      userPoolId: "eu-west-2_J6kM16ZTK",
      userPoolClientId: "5mpdsasf707u9mfeg3uihfeip3",
      identityPoolId: "eu-west-2:7f32016b-3dc6-4c2e-86ae-9697a90e2fb7",
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