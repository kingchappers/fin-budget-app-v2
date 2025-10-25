<script setup lang="ts">
import { useAuthenticator } from '@aws-amplify/ui-vue';
import IncomesForm from '~/components/incomes/incomesForm.vue';
import IncomesTable from '~/components/incomes/incomesTable.vue';
import { useIncomeStore } from '~/server/stores/incomeStore';

const incomeStore = useIncomeStore();
const auth = useAuthenticator();

onMounted(async () => {
    await incomeStore.fetch();
});
</script>

<template>
    <main>
        <div>
            <!-- Error Alert -->
            <UAlert v-if="incomeStore.error" title="Authentication Error" description="" color="error" variant="solid"
                icon="i-heroicons-exclamation-triangle" class="mb-4">
                {{ incomeStore.error }}
                <template #footer>
                    <UButton to="/login" color="neutral" variant="solid" size="sm">
                        Log In
                    </UButton>
                </template>
            </UAlert>

            <!-- Loading State -->
            <UCard v-if="incomeStore.isLoading">
                <USkeleton class="h-8 w-full mb-4" />
                <USkeleton class="h-32 w-full" />
            </UCard>

            <!-- Content -->
            <h1 class="text-4xl font-extrabold">Incomes</h1>
            <IncomesForm :userId="auth.userId" />
            <div v-if="!incomeStore.error">
                <IncomesTable />
            </div>
        </div>
    </main>
</template>