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
                <table className="divide-y-2 table-fixed">
                    <thead>
                        <tr className="text-left">
                            <th className="px-3 lg:px-5 w-5 lg:w-20">Date</th>
                            <th className="px-3 lg:px-5 w-24 lg:w-44">Vendor</th>
                            <th className="px-3 lg:px-5 w-20">Value</th>
                            <th className="px-3 lg:px-5 lg:w-48">Category</th>
                            <th className="px-3 lg:px-5 lg:w-48">Items</th>
                            <th className="px-3 lg:px-5 lg:w-80">Notes</th>
                            <!-- <th className="px-3 lg:px-5 lg:w-5"></th> -->
                        </tr>
                    </thead>
                    <div v-if="transactions?.transactions">
                        <!-- <td colSpan={7} className="text-center">transactions: {{ transactions.transactions }}</td> -->
                        <tr>
                            <TransactionsTable v-for="transaction in transactions.transactions" :key="transaction.id"
                                :transaction="transaction" />
                        </tr>
                    </div>
                    <div v-else>
                        <tbody>
                            <td colSpan={7} className="text-center">No Transactions Found</td>
                        </tbody>
                    </div>
                </table>
            </div>
            <div v-else-if="status === 'error'">
                <p>{{ error }}</p>
            </div>
        </div>
    </main>
</template>