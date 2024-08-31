<script setup lang="ts">
import { useTransactionStore } from '~/server/stores/transactionStore';

const transactionsArray = useTransactionStore();
await callOnce(transactionsArray.fetch)

import { useAuthenticator } from '@aws-amplify/ui-vue';
const auth = useAuthenticator();
import { fetchAuthSession } from 'aws-amplify/auth';

const session = await fetchAuthSession();
// console.log("id token", session.tokens?.idToken)
// console.log("access token", session.tokens?.accessToken)
// console.log("session", session)

// console.log("access token", session)
</script>

<template>
    <main>
        <div>
            <h1 class="text-4xl font-extrabold">Transactions Placeholder</h1>
            <p>{{ auth.authStatus }}</p>
            <p>{{ auth }}</p>
            <p> ___________________________________________________________________</p>
            <p> {{ session }}</p>
            <TransactionsForm />
            <TransactionsTable />
        </div>
    </main>
</template>