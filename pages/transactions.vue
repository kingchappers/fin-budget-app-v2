<script setup lang="ts">

const transactionFilter = {
    limit: 5,
    page: 0
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