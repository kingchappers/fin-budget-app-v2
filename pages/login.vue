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
if (process.env.VITE_AMPLIFY_TEST === undefined) {
  const test = ref(import.meta.env.VITE_AMPLIFY_TEST);
  console.log("AMPLIFY_TEST", process.env.AMPLIFY_TEST);
  console.log("New Amplify_test", process.env.AMPLIFY_TEST);
// Got the Error: 
// 2025-07-17T07:18:40.167Z [INFO]: # Executing command: export AMPLIFY_TEST=$(aws ssm get-parameter --name "AMPLIFY_TEST" --with-decryption --query "Parameter.Value" --output text)
// 120
// 2025-07-17T07:18:40.778Z [WARNING]: An error occurred (AccessDeniedException) when calling the GetParameter operation: User: arn:aws:sts::192350001975:assumed-role/AmplifySSRLoggingRole-c97031ed-59e1-4702-875b-a3c426876ea9/BuildSession is not authorized to perform: ssm:GetParameter on resource: arn:aws:ssm:eu-west-2:192350001975:parameter/AMPLIFY_TEST because no identity-based policy allows the ssm:GetParameter action

// This was after adding that command in the build settings for Amplify. 
// This is done under Hosting -> Build Setting in the Amplify app
// Grant permissions and see if I can access the parameter from the app once the command works
// See if I can also include the amplify.yml in the deployment so I don't have to go in via the UI. I should also be able to get rid of a lot of the other random scripts that are in place too

  console.log("VITE_AMPLIFY_TEST", test);
  console.log("other vite_amplify_test", process.env.VITE_AMPLIFY_TEST)
  console.log("NUXT_PUBLIC_AMPLIFY_TEST", process.env.NUXT_PUBLIC_AMPLIFY_TEST);

  console.log("VUE_APP_FOO_TEST", process.env.VUE_APP_FOO_TEST);
  
  throw new Error("Missing TEST environment variable");
} else {
  console.log("TEST environment variable is set to:", process.env.VITE_AMPLIFY_TEST);
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