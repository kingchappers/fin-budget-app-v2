<script setup lang="ts">
import { format } from 'date-fns';
import { useIncomeStore } from '~/server/stores/incomeStore';
import { storeToRefs } from 'pinia';
import type { incomeType } from '~/types/incomeTypes';
import { updateIncomeZodObject } from '~/types/incomeZodObjects';
import type { FormSubmitEvent } from '#ui/types'
import type { z } from 'zod';
import { fetchAuthSession } from '@aws-amplify/auth';
import { useUserStore } from '~/server/stores/userStore';

const incomeArray = useIncomeStore();
const { incomeList } = storeToRefs(incomeArray)
const isEditingRow = ref(false)
const rowEditing = ref<incomeType>()
const columns = [{
    key: 'incomeDate',
    label: 'Income Date',
    sortable: true
}, {
    key: 'company',
    label: 'Company'
}, {
    key: 'amount',
    label: 'Amount'
}, {
    key: 'Income Category',
    label: 'IncomeCategory'
}, {
    key: 'items',
    label: 'Items'
}, {
    key: 'notes',
    label: 'Notes'
}, {
    key: 'actions'
}]

const items = (row: incomeType) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => {
            isEditingRow.value = true
            rowEditing.value = row
            state.incomeDate = rowEditing.value.incomeDate
            state.company = rowEditing.value.company
            state.amount = rowEditing.value.amount
            state.incomeCategory = rowEditing.value.incomeCategory
            state.items = rowEditing.value.items
            state.notes = rowEditing.value.notes
            state.userId = rowEditing.value.userId
            state.incomeId = rowEditing.value.incomeId
        }
    },], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        // click: () => deleteIncomes([row])
    }]
]
const selectedValues = ref([])
const schema = updateIncomeZodObject
type Schema = z.output<typeof schema>

const state = reactive({
    incomeDate: ref(new Date()),
    company: ref<string>(),
    amount: ref<number>(),
    incomeCategory: ref<string>(),
    items: ref<string>(),
    notes: ref<string>(),
    userId: ref<string>(),
    incomeId: ref<string>()
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
    const incomeDate = event.data.incomeDate;
    const company = event.data.company;
    const amount = event.data.amount;
    const incomeCategory = event.data.incomeCategory;
    const items = event.data.items;
    const notes = event.data.notes;
    const incomeId = event.data.incomeId

    // const income = await $fetch('/api/income/updateIncome', {
    //     method: 'PUT',
    //     headers: {
    //         Authorisation: authorisation,
    //         UserId: userStore.userId
    //     },
    //     body: {
    //         incomeDate,
    //         company,
    //         amount,
    //         incomeCategory,
    //         items,
    //         notes,
    //         incomeId,
    //     }
    // })

    //Grab updated store after submission
    // await callOnce(incomeArray.fetch);
    //Clear the form fields after submission
    isEditingRow.value = false;
}

// async function deleteIncomes(selectedValues: incomeType[]) {
//     const userStore = useUserStore();
//     const session = await fetchAuthSession();
//     let authorisation = ''
//     if (session.tokens && session.tokens.idToken) {
//         authorisation = session.tokens.idToken.toString()
//     } else {
//         console.log('Error: Session token not found. Redirecting to login')
//     }
//     selectedValues.forEach(async (selected, index) => {
//         const incomeId = selected.incomeId;

//         const deletedIncome = await $fetch('/api/income/deleteIncome', {
//             method: 'DELETE',
//             headers: {
//                 Authorisation: authorisation,
//                 UserId: userStore.userId
//             },
//             body: {
//                 incomeId
//             }
//         })

//     })
//     //Grab updated store after submission
//     await useAsyncData(incomeArray.fetch)
// }
</script>

<template>
    <div v-if="incomeList">
        <div class="flex flex-row space-x-4">
            <UButton icon="i-heroicons-trash" class="bg-red-600 hover:bg-red-700"
                @click="deleteIncomes(selectedValues)">Delete Selected</UButton>
        </div>
        <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
            v-model="selectedValues" :columns="columns" :rows="incomeList">
            <template #value-data="{ row }">
                <p>£{{ row.value }}</p>
            </template>

            <template #incomeDate-data="{ row }">
                <p>{{ format(row.incomeDate, 'dd/MM/yyy') }}</p>
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
                        <UFormGroup label="Date" name="incomeDate" class="col-span-2">

                            <UPopover :popper="{ placementablet: 'bottom-start' }">
                                <UButton icon="i-heroicons-calendar-days-20-solid"
                                    :label="format(state.incomeDate, 'd MMM, yyy')"
                                    class="bg-white text-black hover:bg-slate-300" />
                                <template #panel="{ close }">
                                    <ButtonsDatePicker v-model="state.incomeDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </UFormGroup>

                        <UFormGroup label="Company" name="company" class="col-span-2">
                            <UInput v-model="state.company" />
                        </UFormGroup>

                        <UFormGroup label="Amount" name="amount" class="col-span-2">
                            <UInput v-model="state.amount" type="number" />
                        </UFormGroup>

                        <UFormGroup label="Category" name="incomeCategory" class="col-span-2">
                            <UInput v-model="state.incomeCategory" />
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