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
    <UForm :schema="transactionZodObject" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Date" name="date">
            <!-- <UInput v-model="state.transactionDate" /> -->
            <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

                <!-- <template #panel="{ close }">
                    <DatePicker v-model="date" is-required @close="close" />
                </template> -->
                <template #panel="{ close }">
                <ButtonsDatePicker v-model="date" is-required @close="close" />
            </template>
            </UPopover>
        </UFormGroup>

        <UFormGroup label="Password" name="password">
            <UInput v-model="state.vendor" type="string" />
        </UFormGroup>

        <UButton type="submit">
            Submit
        </UButton>
    </UForm>
</template>



<!-- <input aria-label="Date" type="date" name="pickedDate" pattern="dd/mm/yyyy" defaultValue={defaultDate}
    className="border rounded px-1 py-1 w-24 lg:w-32" /> {/*defaultValue={dateToStringInputFormat(new Date)} */}
<input type="text" name="vendor" placeholder="Vendor" className="border rounded px-1 py-1 w-24 lg:w-40" />
<input type="number" step="any" name="value" placeholder="Value" className="border rounded px-1 py-1 w-16 lg:w-20" />
<CategoryComboBox categories={categories} />
<input type="text" name="items" placeholder="Items" className="border rounded px-1 py-1 w-24 lg:w-44" />
<input type="text" name="notes" placeholder="Notes" className="border rounded px-1 py-1 w-24 lg:w-80" />
<FormAddButton /> -->