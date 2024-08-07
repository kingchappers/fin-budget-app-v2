<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { transactionZodObject } from '~/types/transactionZodObject';
import { format } from 'date-fns';
import { useTransactionStore } from '~/server/stores/transactionStore';

const schema = transactionZodObject
const date = ref(new Date())
type Schema = z.output<typeof schema>
const state = reactive({
    transactionDate: ref(new Date()),
    vendor: undefined,
    value: undefined,
    category: undefined,
    items: undefined,
    notes: undefined,
    userId: undefined
})
const refreshing = ref(false)
const transactionsArray = useTransactionStore();

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const transactionDate = event.data.transactionDate;
    const vendor = event.data.vendor;
    const value = event.data.value;
    const category = event.data.category;
    const items = event.data.items;
    const notes = event.data.notes;
    const userId = event.data.userId;

    const transaction = await $fetch('/api/transactions/createTransaction', {
        method: 'POST',
        body: {
            transactionDate,
            vendor,
            value,
            category,
            items,
            notes,
            userId,
        }
    })

    reloadNuxtApp()
    //Clear the form fields after submission
    event.data.transactionDate;
    event.data.vendor = ''
    event.data.value = 0
    event.data.category = ''
    event.data.items = ''
    event.data.notes = ''
    event.data.userId = ''
}

</script>

<template>
    <UForm :schema="schema" :state="state" class="flex flex-row space-x-4" :disabled="refreshing" @submit="onSubmit">
        <UFormGroup label="Date" name="transactionDate">

            <UPopover :popper="{ placementablet: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(state.transactionDate, 'd MMM, yyy')"
                    class="bg-white text-black hover:bg-slate-300" />
                <template #panel="{ close }">
                    <ButtonsDatePicker v-model="state.transactionDate" is-required @close="close" />
                </template>
            </UPopover>
        </UFormGroup>

        <UFormGroup label="Vendor" name="vendor">
            <UInput v-model="state.vendor" />
        </UFormGroup>

        <UFormGroup label="Value" name="value">
            <UInput v-model="state.value" type="number" />
        </UFormGroup>

        <UFormGroup label="Category" name="category">
            <UInput v-model="state.category" />
        </UFormGroup>

        <UFormGroup label="Items" name="items">
            <UInput v-model="state.items" />
        </UFormGroup>

        <UFormGroup label="Notes" name="notes">
            <UInput v-model="state.notes" />
        </UFormGroup>

        <UFormGroup label="User ID" name="userId">
            <UInput v-model="state.userId" />
        </UFormGroup>

        <UButton type="submit" class="h-8 m-6">
            Submit
        </UButton>
    </UForm>
</template>