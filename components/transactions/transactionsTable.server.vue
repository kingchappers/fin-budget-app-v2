<script setup lang="ts">
import type { transactionFilter } from '~/types/transactionFilter';
import { format } from 'date-fns';

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

const columns = [{
    key: 'transactionDate',
    label: 'Date',
    sortable: true
},
{
    key: 'vendor',
    label: 'Vendor'
}, {
    key: 'value',
    label: 'Value'
}, {
    key: 'category',
    label: 'Category'
}, {
    key: 'items',
    label: 'Items'
}, {
    key: 'notes',
    label: 'Notes'
}]

const selected = ref([])
</script>

<template>
    <div v-if="status === 'pending'">
        <p>Getting Transactions...</p>
    </div>
    <div v-else-if="status === 'success'">
        <div v-if="transactions">
            <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }" v-model="selected"
                :columns="columns" :rows="transactions.transactions" >
                <template #value-data="{ row }">
                    <p>£{{ row.value }}</p>
                </template>
                <template #transactionDate-data="{ row }">
                    <p>{{ format(row.transactionDate, 'dd/MM/yyy') }}</p>
                </template>
                <!-- Implement a menu here for editing? Would not work with current versions of nuxtui -->
            </UTable>
        </div>
        <div v-else>
            <tbody>
                <td colSpan={7} class="text-center">No Transactions Found</td>
            </tbody>
        </div>
    </div>
    <div v-else-if="status === 'error'">
        <p>{{ error }}</p>
    </div>
</template>