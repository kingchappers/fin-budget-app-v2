<script setup lang="ts">
import { useTransactionStore } from '~/server/stores/transactionStore';

const transactionsArray = useTransactionStore();
try {
    await callOnce(transactionsArray.fetch)
} catch (e) {

}
</script>

<template>
    <main>
        <div>
            <h1 class="text-4xl font-extrabold">Transactions</h1>
            <TransactionsForm />
            <TransactionsTable />
        </div>
    </main>
</template>