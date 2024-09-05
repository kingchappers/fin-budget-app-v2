<script setup lang="ts">
import { useTransactionStore } from '~/server/stores/transactionStore';

const transactionsArray = useTransactionStore();
await callOnce(transactionsArray.fetch)

import { useAuthenticator } from '@aws-amplify/ui-vue';
const auth = useAuthenticator();
import { fetchAuthSession } from 'aws-amplify/auth';

const session = await fetchAuthSession();
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