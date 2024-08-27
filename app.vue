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
            <h1>Hello {{ user.username }}!</h1>
            <h1> {{ user.userId }}</h1>
            <button @click="signOut">Sign Out</button>
        </template>
    </authenticator>

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>