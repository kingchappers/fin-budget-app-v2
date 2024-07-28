<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { transactionZodObject } from '~/types/transactionZodObject';
import { format } from 'date-fns';
// import { DatePicker as VCalendarDatePicker } from 'v-calendar'
// import 'v-calendar/dist/style.css'
// import type { DatePickerDate, DatePickerRangeObject } from 'v-calendar/dist/types/src/use/datePicker.js';

// const test = transactionZodObject

type Schema = z.output<typeof transactionZodObject>

const state = reactive({
    transactionDate: undefined,
    vendor: undefined,
    value: undefined,
    category: undefined,
    items: undefined,
    notes: undefined,
    userId: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    //Need to do submit api call
    console.log(event.data)
}

const date = ref(new Date())
</script>

<template>
    <UForm :schema="transactionZodObject" :state="state" class="flex flex-row space-x-4" @submit="onSubmit">
        <UFormGroup label="Date" name="date">
            <!-- <UInput v-model="state.transactionDate" /> -->
            <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')"
                    class="bg-white text-black hover:bg-slate-300" />

                <!-- <template #panel="{ close }">
                    <DatePicker v-model="date" is-required @close="close" />
                </template> -->
                <template #panel="{ close }">
                    <ButtonsDatePicker v-model="date" is-required @close="close" />
                </template>
            </UPopover>
        </UFormGroup>

        <UFormGroup label="Vendor" name="vendor">
            <UInput v-model="state.vendor" type="text" />
        </UFormGroup>

        <UFormGroup label="Value" name="value">
            <UInput v-model="state.value" type="number" />
        </UFormGroup>

        <UFormGroup label="Category" name="category">
            <UInput v-model="state.category" type="text" />
        </UFormGroup>

        <UFormGroup label="Items" name="items" >
            <UInput v-model="state.items" type="text" />
        </UFormGroup>

        <UFormGroup label="Notes" name="notes">
            <UInput v-model="state.notes" type="text" />
        </UFormGroup>

        <UButton type="submit" class="h-8 m-6">
            Submit
        </UButton>
    </UForm>
</template>