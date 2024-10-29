<script setup lang="ts">
import { format } from 'date-fns';
import { useTransactionStore } from '~/server/stores/transactionStore';
import { storeToRefs } from 'pinia';
import type { transactionType } from '~/types/transactionTypes';
import { updateTransactionZodObject } from '~/types/transactionZodObjects';
import type { FormSubmitEvent } from '#ui/types'
import type { z } from 'zod';
import { fetchAuthSession } from '@aws-amplify/auth';
import { useUserStore } from '~/server/stores/userStore';

const transactionsArray = useTransactionStore();
const { transactionsList } = storeToRefs(transactionsArray)
const isEditingRow = ref(false)
const rowEditing = ref<transactionType>()
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
        click: () => {
            isEditingRow.value = true
            rowEditing.value = row
            state.transactionDate = rowEditing.value.transactionDate
            state.vendor = rowEditing.value.vendor
            state.value = rowEditing.value.value
            state.category = rowEditing.value.category
            state.items = rowEditing.value.items
            state.notes = rowEditing.value.notes
            state.userId = rowEditing.value.userId
            state.transactionId = rowEditing.value.transactionId
        }
    },], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => deleteTransactions([row])
    }]
]
const selectedValues = ref([])
const schema = updateTransactionZodObject
type Schema = z.output<typeof schema>

const state = reactive({
    transactionDate: ref(new Date()),
    vendor: ref<string>(),
    value: ref<number>(),
    category: ref<string>(),
    items: ref<string>(),
    notes: ref<string>(),
    userId: ref<string>(),
    transactionId: ref<string>()
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const userStore = useUserStore();
    const session = await fetchAuthSession();
    let authorisation = ''
    if (session.tokens && session.tokens.idToken) {
        authorisation = session.tokens.idToken.toString()
    } else {
        console.log('Error: Session token not found. Redirecting to login')
    }
    const transactionDate = event.data.transactionDate;
    const vendor = event.data.vendor;
    const value = event.data.value;
    const category = event.data.category;
    const items = event.data.items;
    const notes = event.data.notes;
    const transactionId = event.data.transactionId

    const transaction = await $fetch('/api/transactions/updateTransaction', {
        method: 'PUT',
        headers: {
            Authorisation: authorisation,
            UserId: userStore.userId
        },
        body: {
            transactionDate,
            vendor,
            value,
            category,
            items,
            notes,
            transactionId,
        }
    })

    //Grab updated store after submission
    await callOnce(transactionsArray.fetch);
    //Clear the form fields after submission
    isEditingRow.value = false;
}

async function deleteTransactions(selectedValues: transactionType[]) {
    const userStore = useUserStore();
    const session = await fetchAuthSession();
    let authorisation = ''
    if (session.tokens && session.tokens.idToken) {
        authorisation = session.tokens.idToken.toString()
    } else {
        console.log('Error: Session token not found. Redirecting to login')
    }
    selectedValues.forEach(async (selected, index) => {
        const transactionId = selected.transactionId;

        const deletedTransaction = await $fetch('/api/transactions/deleteTransaction', {
            method: 'DELETE',
            headers: {
                Authorisation: authorisation,
                UserId: userStore.userId
            },
            body: {
                transactionId
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
            v-model="selectedValues" :columns="columns" :rows="transactionsList">
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
        </UTable>

        <!-- Row Editing Modal Form -->
        <div v-if="rowEditing">
            <UModal v-model="isEditingRow">
                <UCard>
                    <UForm :schema="schema" :state="state" class="grid grid-cols-4 gap-4" @submit="onSubmit">
                        <UFormGroup label="Date" name="transactionDate" class="col-span-2">

                            <UPopover :popper="{ placementablet: 'bottom-start' }">
                                <UButton icon="i-heroicons-calendar-days-20-solid"
                                    :label="format(state.transactionDate, 'd MMM, yyy')"
                                    class="bg-white text-black hover:bg-slate-300" />
                                <template #panel="{ close }">
                                    <ButtonsDatePicker v-model="state.transactionDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </UFormGroup>

                        <UFormGroup label="Vendor" name="vendor" class="col-span-2">
                            <UInput v-model="state.vendor" />
                        </UFormGroup>

                        <UFormGroup label="Value" name="value" class="col-span-2">
                            <UInput v-model="state.value" type="number" />
                        </UFormGroup>

                        <UFormGroup label="Category" name="category" class="col-span-2">
                            <UInput v-model="state.category" />
                        </UFormGroup>

                        <UFormGroup label="Items" name="items" class="col-span-2">
                            <UInput v-model="state.items" />
                        </UFormGroup>

                        <UFormGroup label="Notes" name="notes" class="col-span-2">
                            <UInput v-model="state.notes" />
                        </UFormGroup>

                        <UFormGroup label="User ID" name="userId" class="col-span-2">
                            <UInput v-model="state.userId" />
                        </UFormGroup>

                        <UButton type="submit" class="col-start-1 h-8 w-16 m-6">
                            Update
                        </UButton>
                    </UForm>
                </UCard>
            </UModal>
        </div>
    </div>
</template>