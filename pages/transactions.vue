<script setup lang="ts">
import type { transactionFilter } from '~/types/transactionFilter';


const transactionFilter: transactionFilter = {
    limit: 5,
    page: 0,
    userId: ''
}

const { data: transactions, status, error } = await useFetch('/api/transactions/getTransactions', {
    method: 'get',
    params: {
        transactionFilter
    },
})
</script>

<template>
    <main>
        <div>
            <h1 class="text-4xl font-extrabold">Transactions Placeholder</h1>
            <div v-if="status === 'pending'">
                <p>Getting Transactions...</p>
            </div>
            <div v-else-if="status === 'success'">
                <div v-if="transactions">
                    <p>transactions: {{ transactions.transactions }}</p>
                </div>
            </div>
            <div v-else-if="status === 'error'">
                <p>{{ error }}</p>
            </div>
        </div>
    </main>
</template>