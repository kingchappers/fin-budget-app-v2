<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { incomeFormZodObject } from '~/types/incomeZodObjects';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { useIncomeStore } from '~/server/stores/incomeStore';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-vue';

interface Props {
  userId: string
}
const props = defineProps<Props>()

const schema = incomeFormZodObject
type Schema = z.output<typeof schema>
const initialState = {
    incomeDate: ref(new Date()),
    amount: undefined,
    incomeCategory: undefined,
    notes: undefined,
}
const state = reactive({ ...initialState })
const refreshing = ref(false)
const incomeArray = useIncomeStore();
// const auth = useAuthenticator();
const session = await fetchAuthSession();
const df = new DateFormatter('en-GB', {
    dateStyle: 'medium'
})
const incomeDateFormValue = shallowRef(new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))
const incomeCategories = ['Job', 'Other', 'Refund', 'Rent', 'Side Project', 'Tax Refund']

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const incomeDate = incomeDateFormValue.value.toDate('UTC');;
    const amount = event.data.amount;
    const incomeCategory = event.data.incomeCategory;
    const notes = event.data.notes;
    const userId = props.userId;
    let token = ''
    if (session.tokens && session.tokens.idToken) {
        token = session.tokens.idToken.toString()
        console.log('Session token found!');
    } else {
        console.log('Error: Session token not found. Redirecting to login')
    }

    const income = await useFetch('https://530n5rqhl4.execute-api.eu-west-2.amazonaws.com/prod/createIncome', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: {
            incomeDate,
            amount,
            incomeCategory,
            notes,
            userId
        }
    })

    //Grab updated store after submission
    await callOnce(incomeArray.fetch)
    //Clear the form fields after submission
    event.data.incomeDate;
    event.data.amount = 0
    event.data.incomeCategory = ''
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
            <UPopover>
                <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                    {{ incomeDateFormValue ? df.format(incomeDateFormValue.toDate(getLocalTimeZone())) : 'Select a date'
                    }}
                </UButton>

                <template #content>
                    <UCalendar v-model="incomeDateFormValue" class="p-2" />
                </template>
            </UPopover>
        </UFormField>

        <UFormField name="amount">
            <p class="text-sm">Ammount</p>
            <UInput v-model="state.amount" type="number" />
        </UFormField>

        <UFormField name="incomeCategory">
            <p class="text-sm">Category</p>
            <USelectMenu v-model="state.incomeCategory" :items="incomeCategories" placeholder="Select a category" class="w-full" />
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