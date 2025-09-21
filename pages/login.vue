<script setup lang="ts">
import { fetchAuthSession } from "@aws-amplify/core";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from 'aws-amplify';

if (import.meta.env.VITE_COGNITO_USER_POOL_ID === undefined) {
  throw new Error("Missing COGNITO_USER_POOL_ID environment variable");
}

if (import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID === undefined) {
  throw new Error("Missing COGNITO_USER_POOL_CLIENT_ID environment variable");
}
if (import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID === undefined) {
  throw new Error("Missing COGNITO_IDENTITY_POOL_ID environment variable");
}

try {
  const currentSession = await fetchAuthSession();
  if (currentSession) {
    // User is authenticated
    console.log("Session found!");
  } else {
    // User is not authenticated
    console.log("No session found.");
  }  
} catch (error) {
  console.error("Error fetching auth session:", error);
}

Amplify.configure({
    Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID, 
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
    </main>
</template>