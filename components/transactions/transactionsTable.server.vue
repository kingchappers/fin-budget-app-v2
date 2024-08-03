<script setup lang="ts">
import { format } from 'date-fns';
import { useTransactionStore } from '~/server/stores/transactionStore';
import { storeToRefs } from 'pinia';

const transactionsArray = useTransactionStore();
await callOnce(transactionsArray.fetch)

const {transactionsList} = storeToRefs(transactionsArray)

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


    <div v-if="transactionsArray.status === 'pending'">
        <p>Getting Transactions...</p>
    </div>
    <div v-else-if="transactionsArray.status === 'success'">
        <div v-if="transactionsArray.transactionsList">
    <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }" v-model="selected"
                :columns="columns" :rows="transactionsList.transactions" >
                <template #value-data="{ row }">
                    <p>£{{ row.value }}</p>
                </template>
                <template #transactionDate-data="{ row }">
                    <p>{{ format(row.transactionDate, 'dd/MM/yyy') }}</p>
                </template>
                <!-- Implement a menu here for editing? Would not work with current versions of nuxtui -->
            </UTable>
            <p>{{ transactionsArray.transactionsList.transactions }}</p>
        </div>
    </div>
    <div v-else>
            <tbody>
                <td colSpan={7} class="text-center">No Transactions Found</td>
            </tbody>
        </div>
</template>
