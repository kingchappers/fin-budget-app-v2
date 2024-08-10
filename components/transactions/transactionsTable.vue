<script setup lang="ts">
import { format } from 'date-fns';
import { useTransactionStore } from '~/server/stores/transactionStore';
import { storeToRefs } from 'pinia';
import type { transactionType } from '~/types/transactionTypes';

const transactionsArray = useTransactionStore();
const { transactionsList } = storeToRefs(transactionsArray)

const columns = [{
    key: 'transactionDate',
    label: 'Date',
    sortable: true
}, {
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
}, {
    key: 'actions'
}]

const items = (row: transactionType) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.transactionDate)
    },], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => deleteTransactions([row])
    }]
]
const selectedValues = ref([])

async function deleteTransactions(selectedValues: transactionType[]) {
    console.log(selectedValues)

    selectedValues.forEach(async (selected, index) => {
        const userId = selected.userId;
        const _id = selected._id;

        const deletedTransaction = await $fetch('/api/transactions/deleteTransaction', {
            method: 'POST',
            body: {
                userId,
                _id
            }
        })

    })

    //Grab updated store after submission
    await useAsyncData(transactionsArray.fetch)
}
</script>

<template>
    <div v-if="transactionsList">
        <div class="flex flex-row space-x-4">
            <UButton icon="i-heroicons-trash" class="bg-red-600 hover:bg-red-700"
                @click="deleteTransactions(selectedValues)">Delete Selected</UButton>
        </div>
        <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
            v-model="selectedValues" :columns="columns" :rows="transactionsList.transactions">
            <template #value-data="{ row }">
                <p>£{{ row.value }}</p>
            </template>

            <template #transactionDate-data="{ row }">
                <p>{{ format(row.transactionDate, 'dd/MM/yyy') }}</p>
            </template>

            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
            <!-- Implement a menu here for editing? Would not work with current versions of nuxtui -->
        </UTable>
    </div>
</template>

<!-- label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id) -->