<script setup lang="ts">
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from 'aws-amplify';
// import awsconfig from '~/src/aws-exports.js';
import config from '~/src/amplifyconfiguration.json';


Amplify.configure(config);
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