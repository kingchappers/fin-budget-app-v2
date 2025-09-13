<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { transactionFormZodObject } from '~/types/transactionZodObjects';
import { format } from 'date-fns';
import { useTransactionStore } from '~/server/stores/transactionStore';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-vue';


const schema = transactionFormZodObject
type Schema = z.output<typeof schema>
const state = reactive({
    transactionDate: ref(new Date()),
    vendor: undefined,
    value: undefined,
    category: undefined,
    items: undefined,
    notes: undefined,
})
const refreshing = ref(false)
const transactionsArray = useTransactionStore();
const auth = useAuthenticator();
const session = await fetchAuthSession({ forceRefresh: true });

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const transactionDate = event.data.transactionDate;
    const vendor = event.data.vendor;
    const value = event.data.value;
    const category = event.data.category;
    const items = event.data.items;
    const notes = event.data.notes;
    const userId = auth.user.userId;
    let authorisation = ''
    if (session.tokens && session.tokens.idToken) {
        authorisation = session.tokens.idToken.toString()
    } else {
        console.log('Error: Session token not found. Redirecting to login')
    }

    const transaction = await $fetch('/api/transactions/createTransaction', {
        method: 'POST',
        headers: {
            Authorisation: authorisation
        },
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

    //Grab updated store after submission
    await callOnce(transactionsArray.fetch)
    //Clear the form fields after submission
    event.data.transactionDate;
    event.data.vendor = ''
    event.data.value = 0
    event.data.category = ''
    event.data.items = ''
    event.data.notes = ''
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

        <UButton type="submit" class="h-8 m-6">
            Submit
        </UButton>
    </UForm>
</template>