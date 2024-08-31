<script setup lang="ts">
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);
const auth = useAuthenticator()
</script>

<template>
    <main>
        <authenticator>
            <template v-slot="{ user, signOut }">
                <h1>Hello {{ user.signInDetails.loginId }}!</h1>

                <button @click="signOut">Sign Out</button>
            </template>
        </authenticator>
        <template v-if="auth.route === 'authenticated'">
            <h1>Hello {{ auth.user?.username }}!</h1>
            <button @click="auth.signOut">Sign out</button>
        </template>
    </main>
</template>