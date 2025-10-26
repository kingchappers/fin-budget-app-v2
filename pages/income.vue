<script setup lang="ts">
import IncomesForm from '~/components/incomes/incomesForm.vue';
import IncomesTable from '~/components/incomes/incomesTable.vue';
import { useIncomeStore } from '~/server/stores/incomeStore';
import { useAuth } from '~/composables/useAuth'

const incomeArray = useIncomeStore();
const { checkAuth, authState } = useAuth()

// Run fetch only on the client after we've confirmed auth state.
onMounted(async () => {
    try {
        await checkAuth()
        if (authState.value.tokens) {
            await incomeArray.fetch()
        } else {
            // no tokens — incomeArray.fetch will no-op, but we avoid calling it
            console.warn('Not authenticated; incomes not fetched')
        }
    } catch (e) {
        console.log(e)
    }
})
</script>

<template>
    <main>
        <div>
            <h1 class="text-4xl font-extrabold">Incomes</h1>
            <IncomesForm />
            <IncomesTable />
        </div>
    </main>
</template>