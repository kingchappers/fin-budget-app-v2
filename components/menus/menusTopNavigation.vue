<script setup lang="ts">
import { useAuthenticator } from '@aws-amplify/ui-vue'
const auth = useAuthenticator();

const links = [
    [{
        label: 'Transactions',
        icon: 'i-heroicons-credit-card',
        to: '/transactions'
    }, {
        label: 'Income',
        icon: 'i-heroicons-briefcase',
        to: '/income'
    }, {
        label: 'Categories',
        icon: 'i-heroicons-tag',
        to: `/category`
    }, {
        label: 'Targets',
        icon: 'i-heroicons-chart-pie',
        to: '/targets'
    }, {
        label: 'Variance',
        icon: 'i-heroicons-chart-bar',
        to: '/variance'
    }, {
        label: 'Savings',
        icon: 'i-heroicons-currency-pound',
        to: '/savings'
    }, {
        label: 'Trends',
        icon: 'i-heroicons-presentation-chart-line',
        to: '/trends'
    }, {
        label: 'Utilties',
        icon: 'i-heroicons-wrench-screwdriver',
        to: '/utilities'
    }], [{
        label: 'Profile',
        icon: 'i-heroicons-user',
        to: '/profile'
    }, {
        label: 'Help',
        icon: 'i-heroicons-question-mark-circle',
        to: '/help',
    }, {
        label: 'Sign In / Register',
        icon: 'i-heroicons-arrow-left-end-on-rectangle',
        to: '/login'
    }]
]
</script>

<template>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    <UButton variant="soft" icon="i-heroicons-arrow-left-start-on-rectangle"
        class="my-5 bg-transparant border-transparent text-gray-500 hover:bg-white hover:text-gray-600"
        @click="auth.signOut">
        Sign Out
    </UButton>
</template>