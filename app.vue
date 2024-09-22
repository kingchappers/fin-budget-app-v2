<script setup>
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from 'aws-amplify';
import awsconfig from '~/aws-exports';

Amplify.configure(awsconfig);
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>