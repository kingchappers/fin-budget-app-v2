<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);
</script>

<template>
    <authenticator>
        <template v-slot="{ user, signOut }">
            <h1>Hello {{ user.signInDetails.loginId }}!</h1>
            <p>{{ user }}</p>
            <h1> {{ user.userId }}</h1>
            <button @click="signOut">Sign Out</button>
        </template>
    </authenticator>

    <button @click="signOut">Sign Out</button>

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>