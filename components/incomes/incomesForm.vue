<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { incomeFormZodObject } from '~/types/incomeZodObjects';
import { format } from 'date-fns';
import { useIncomeStore } from '~/server/stores/incomeStore';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-vue';

const schema = incomeFormZodObject
type Schema = z.output<typeof schema>
const initialState = {
    incomeDate: ref(new Date()),
    company: undefined,
    amount: undefined,
    incomeCategory: undefined,
    notes: undefined,
    items: undefined,
}
const state = reactive({ ...initialState })
const refreshing = ref(false)
const incomeArray = useIncomeStore();
const auth = useAuthenticator();
const session = await fetchAuthSession();
const incomeCategories = [
    {
        label: 'Job',
        value: 'Job'
    },
    {
        label: 'Other',
        value: 'Other'
    },
    {
        label: 'Refund',
        value: 'Refund'
    },
    {
        label: 'Rent',
        value: 'Rent'
    },
    {
        label: 'Side Project',
        value: 'Side Project'
    },
    {
        label: 'Tax Refund',
        value: 'Tax Refund'
    }
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const incomeDate = event.data.incomeDate;
    const company = event.data.company;
    const amount = event.data.amount;
    const incomeCategory = event.data.incomeCategory;
    const items = event.data.items;
    const notes = event.data.notes;
    const userId = auth.user.userId;
    let token = ''
    if (session.tokens && session.tokens.idToken) {
        token = session.tokens.idToken.toString()
        console.log('Session token found:', token);
    } else {
        console.log('Error: Session token not found. Redirecting to login')
    }

    const income = await useFetch('https://dg2rxkailb.execute-api.eu-west-2.amazonaws.com/prod/income', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: {
            incomeDate,
            amount,
            company,
            incomeCategory,
            items,
            notes,
            userId
        }
    })

    //Grab updated store after submission
    await callOnce(incomeArray.fetch)
    //Clear the form fields after submission
    event.data.incomeDate;
    event.data.company = ''
    event.data.amount = 0
    event.data.incomeCategory = ''
    event.data.items = ''
    event.data.notes = ''

    Object.assign(state, {
        ...initialState,
        incomeDate: ref(new Date())
    })
}
</script>
<template>
    <UForm :schema="schema" :state="state" class="grid grid-cols-3 lg:grid-cols-6 gap-x-4" :disabled="refreshing"
        @submit="onSubmit">
        <UFormField name="incomeDate">
            <p class="text-sm">Date</p>
            <UPopover :popper="{ placementablet: 'bottom-start' }" class="-mr-4">
                <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(state.incomeDate, 'd MMM, yyy')"
                    class="bg-white text-black hover:bg-slate-300" />
                <template #panel="{ close }">
                    <ButtonsDatePicker v-model="state.incomeDate" is-required @close="close" />
                </template>
            </UPopover>
        </UFormField>

        <UFormField name="company">
            <p class="text-sm">Company</p>
            <UInput v-model="state.company" />
        </UFormField>

        <UFormField name="amount">
            <p class="text-sm">Ammount</p>
            <UInput v-model="state.amount" type="number" />
        </UFormField>

        <UFormField name="incomeCategory">
            <p class="text-sm">Category</p>
            <USelect v-model="state.incomeCategory" :options="incomeCategories" option-attribute="value"
                :searchable="true" placeholder="Select a category" class="w-full" />
        </UFormField>

        <UFormField name="items">
            <p class="text-sm">Items</p>
            <UInput v-model="state.items" />
        </UFormField>

        <UFormField name="notes">
            <p class="text-sm">Notes</p>
            <UInput v-model="state.notes" />
        </UFormField>

        <UButton type="submit" class="h-8 m-6">
            Submit
        </UButton>
    </UForm>
</template>