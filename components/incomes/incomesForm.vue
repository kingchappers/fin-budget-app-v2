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
const state = reactive({
    incomeDate: ref(new Date()),
    company: undefined,
    amount: undefined,
    incomeCategory: undefined,
    notes: undefined,
    items: undefined,
})
const refreshing = ref(false)
const incomeArray = useIncomeStore();
const auth = useAuthenticator();
const session = await fetchAuthSession();

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

    const income = await $fetch('https://dg2rxkailb.execute-api.eu-west-2.amazonaws.com/prod/income', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://main.d3m9wu6rhd9z99.amplifyapp.com'
            // 'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            // 'Access-Control-Allow-Methods': 'OPTIONS,POST',
            // 'Access-Control-Allow-Credentials': 'true',
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
}
</script>

<template>
    <UForm :schema="schema" :state="state" class="flex flex-row space-x-4" :disabled="refreshing" @submit="onSubmit">
        <UFormGroup label="Date" name="incomeDate">

            <UPopover :popper="{ placementablet: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(state.incomeDate, 'd MMM, yyy')"
                    class="bg-white text-black hover:bg-slate-300" />
                <template #panel="{ close }">
                    <ButtonsDatePicker v-model="state.incomeDate" is-required @close="close" />
                </template>
            </UPopover>
        </UFormGroup>

        <UFormGroup label="Company" name="company">
            <UInput v-model="state.company" />
        </UFormGroup>

        <UFormGroup label="Amount" name="amount">
            <UInput v-model="state.amount" type="number" />
        </UFormGroup>

        <UFormGroup label="incomeCategory" name="incomeCategory">
            <UInput v-model="state.incomeCategory" />
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