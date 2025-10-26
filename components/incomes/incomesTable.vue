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
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'

const UCheckbox = resolveComponent('UCheckbox')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')
const toast = useToast()

const incomeArray = useIncomeStore();
await incomeArray.fetch()
console.log("income array: " + incomeArray.incomeList)
const { incomeList, status, userId } = storeToRefs(incomeArray)
console.log("income list: " + incomeList.value)
const isEditingRow = ref(false)
const rowEditing = ref<incomeType>()
const columns = [{
    key: 'incomeDate',
    label: 'Income Date',
    sortable: true
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
        onClick: () => {
            isEditingRow.value = true
            rowEditing.value = row
            state.incomeDate = rowEditing.value.incomeDate
            state.amount = rowEditing.value.amount
            state.incomeCategory = rowEditing.value.incomeCategory
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
    const amount = event.data.amount;
    const incomeCategory = event.data.incomeCategory;
    const items = event.data.items;
    const notes = event.data.notes;
    const incomeId = event.data.incomeId
    isEditingRow.value = false;
}

// ########################################################################
// Redesigning the income table for the Nuxt UI v4 components
// New script section is below, leaving the section above to later remove
// ########################################################################
const newColumns: TableColumn<incomeType>[] = [{
    id: "select",
    header: ({ table }) => h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all'
    }),
    cell: ({ row }) => h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'aria-label': 'Select row'
    }),
    enableSorting: false,
    enableHiding: false
}, {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
        return new Date(row.getValue('incomeDate')).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }
}, {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue('amount'))

        const formatted = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(amount)

        return h('div', { class: 'text-right font-medium' }, formatted)
    }
}, {
    accessorKey: 'incomeCategory',
    header: 'Category',
    cell: ({ row }) => row.getValue('incomeCategory')
}, {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => row.getValue('notes') || '-'
},
{
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
        const items = [{
            type: 'label',
            label: 'Actions'
        }, {
            label: 'Delete Income',
            onSelect() {
                deleteIncome(row.original.incomeId)

                toast.add({
                    title: 'Transaction Deleted!',
                    color: 'success',
                    icon: 'i-lucide-circle-check'
                })
            }
        }]

        return h('div', { class: 'text-right' }, h(UDropdownMenu, {
            'content': {
                align: 'end'
            },
            items,
            'aria-label': 'Actions dropdown'
        }, () => h(UButton, {
            'icon': 'i-lucide-ellipsis-vertical',
            'color': 'neutral',
            'variant': 'ghost',
            'class': 'ml-auto',
            'aria-label': 'Actions dropdown'
        })))
    }
}]

const table = useTemplateRef('table')
</script>

<template>
    <h1>Income list</h1>
    <p>{{ incomeList }}</p>

    <!-- 
    ########################################################################
    Redesigning the income table for the Nuxt UI v4 components
    ########################################################################
    -->

    <h1 class="text-2xl font-bold mb-4">Redesigned income table</h1>
    <div class="flex-1 divide-y divide-accented w-full">
        <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
            <UDropdownMenu :items="table?.tableApi?.getAllColumns().filter(column => column.getCanHide()).map(column => ({
                label: upperFirst(column.id),
                type: 'checkbox' as const,
                checked: column.getIsVisible(),
                onUpdateChecked(checked: boolean) {
                    table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                },
                onSelect(e: Event) {
                    e.preventDefault()
                }
            }))" :content="{ align: 'end' }">
                <UButton label="Columns" color="neutral" variant="outline" trailing-icon="i-lucide-chevron-down"
                    class="ml-auto" aria-label="Columns select dropdown" />
            </UDropdownMenu>
        </div>
        <!-- <div v-if="incomeList"> -->
        <UTable ref="table" :rows="incomeList" :columns="newColumns" sticky class="h-96">
            <template #expanded="{ row }">
                <pre>{{ row.original }}</pre>
            </template>
        </UTable>
        <!-- </div> -->

        <div class="px-4 py-3.5 text-sm text-muted">
            {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
            {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
        </div>
    </div>
    <!-- 
    ########################################################################
    Redesigning the income table for the Nuxt UI v4 components
    ########################################################################
    -->

    <h1>Table</h1>
    <div v-if="incomeList">
        <div class="flex flex-row space-x-4">
            <UButton icon="i-heroicons-trash" class="bg-red-600 hover:bg-red-700"
                @onClick="deleteIncomes(selectedValues)">
                Delete Selected</UButton>
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
                <UDropdownMenu :items="items(row)">
                    <UButton color="neutral" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdownMenu>
            </template>
        </UTable>

        <!-- Row Editing Modal Form -->
        <div v-if="rowEditing">
            <UModal v-model="isEditingRow">
                <UCard>
                    <UForm :schema="schema" :state="state" class="grid grid-cols-4 gap-4" @submit="onSubmit">
                        <UFormField label="Date" name="incomeDate" class="col-span-2">

                            <UPopover :popper="{ placementablet: 'bottom-start' }">
                                <UButton icon="i-heroicons-calendar-days-20-solid"
                                    :label="format(state.incomeDate, 'd MMM, yyy')"
                                    class="bg-white text-black hover:bg-slate-300" />
                                <template #panel="{ close }">
                                    <ButtonsDatePicker v-model="state.incomeDate" is-required @close="close" />
                                </template>
                            </UPopover>
                        </UFormField>

                        <UFormField label="Amount" name="amount" class="col-span-2">
                            <UInput v-model="state.amount" type="number" />
                        </UFormField>

                        <UFormField label="Category" name="incomeCategory" class="col-span-2">
                            <UInput v-model="state.incomeCategory" />
                        </UFormField>

                        <UFormField label="Items" name="items" class="col-span-2">
                            <UInput v-model="state.items" />
                        </UFormField>

                        <UFormField label="Notes" name="notes" class="col-span-2">
                            <UInput v-model="state.notes" />
                        </UFormField>

                        <UFormField label="User ID" name="userId" class="col-span-2">
                            <UInput v-model="state.userId" />
                        </UFormField>

                        <UButton type="submit" class="col-start-1 h-8 w-16 m-6">
                            Update
                        </UButton>
                    </UForm>
                </UCard>
            </UModal>
        </div>
    </div>
</template>