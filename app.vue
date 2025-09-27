<script setup>
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from 'aws-amplify';
// import awsconfig from '~/src/aws-exports.js';

// Amplify.configure(awsconfig);
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
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>