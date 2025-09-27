<script setup lang="ts">
import { useAuthenticator } from '@aws-amplify/ui-vue'
const auth = useAuthenticator();

const accountMenu = [[{
    label: 'Profile',
    icon: 'i-heroicons-user',
    to: '/profile'
}], [{
    label: 'Help',
    icon: 'i-heroicons-question-mark-circle',
    to: '/help',
}], [{
    label: 'Sign In / Register',
    icon: 'i-heroicons-arrow-left-end-on-rectangle',
    to: '/login'
}]]

const accountMenuAuthenticated = [[{
    label: 'Profile',
    icon: 'i-heroicons-user',
    to: '/profile'
}], [{
    label: 'Help',
    icon: 'i-heroicons-question-mark-circle',
    to: '/help',
}], [{
    label: 'Sign Out',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    to: '/login',
    onClick: () => auth.signOut()
}]]

const accountMenuToUse = computed(() => {
    return auth.user ? accountMenuAuthenticated : accountMenu
})

const utilityMenu = [
    [{
        label: 'Categories',
        icon: 'i-heroicons-tag',
        to: `/category`
    }], [{
        label: 'Targets',
        icon: 'i-heroicons-chart-pie',
        to: '/targets'
    }], [{
        label: 'Variance',
        icon: 'i-heroicons-chart-bar',
        to: '/variance'
    }], [{
        label: 'Savings',
        icon: 'i-heroicons-currency-pound',
        to: '/savings'
    }], [{
        label: 'Trends',
        icon: 'i-heroicons-presentation-chart-line',
        to: '/trends'
    }], [{
        label: 'Utilties',
        icon: 'i-heroicons-wrench-screwdriver',
        to: '/utilities'
    }]]


const links = [
    [{
        label: 'Transactions',
        icon: 'i-heroicons-credit-card',
        to: '/transactions'
    }, {
        label: 'Income',
        icon: 'i-heroicons-briefcase',
        to: '/income'
    }]
]
</script>

<template>
    <div class="lg:flex md:flex-nowrap border-b border-neutral-200 dark:border-neutral-800 w-lvw">
        <UNavigationMenu orientation="horizontal" :items="links"/>
        <UDropdownMenu :items="utilityMenu" :popper="{ placement: 'bottom-start' }">
            <UButton label="Utilities" icon="i-heroicons-bars-3-20-solid" color="white" variant="soft" class="ml-2" />
        </UDropdownMenu>
        <UDropdownMenu :items="accountMenuToUse" :popper="{ placement: 'bottom-start' }">
            <UButton label="Account" icon="i-heroicons-bars-3-20-solid" color="white" variant="soft" class="ml-2" />
        </UDropdownMenu>
    </div>
</template>