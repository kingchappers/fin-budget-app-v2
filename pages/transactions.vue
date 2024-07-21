<script setup lang="ts">
import type { transactionFilter } from '~/types/transactionFilter';


const transactionFilter: transactionFilter = {
    limit: 5,
    page: 0,
    userId: ''
}

const { data: transactions } = await useFetch('/api/transactions/getTransactions', {
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
            <p>transactions: {{ transactions }}</p>
        </div>
    </main>
</template>