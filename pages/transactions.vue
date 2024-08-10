<script setup lang="ts">
import { useTransactionStore } from '~/server/stores/transactionStore';

const transactionsArray = useTransactionStore();
await callOnce(transactionsArray.fetch)
// const { transactionsList } = storeToRefs(transactionsArray)
</script>

<template>
    <main>
        <div>
            <h1 class="text-4xl font-extrabold">Transactions Placeholder</h1>
            <TransactionsForm />
            <TransactionsTable />
        </div>
    </main>
</template>