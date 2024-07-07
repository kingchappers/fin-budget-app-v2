<script setup lang="ts">
const { data: transactions } = await useFetch('/api/transactions/getTransactions')
</script>

<template>
    <main>
        <div>
            <h1 class="text-4xl font-extrabold">Transactions Placeholder</h1>
            <p>Test: {{ transactions }}</p>
        </div>
    </main>
</template>