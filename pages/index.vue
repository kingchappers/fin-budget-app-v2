<script setup lang="ts">
// import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
// import { incomeFormZodObject } from '~/types/incomeZodObjects';
// import type { FormSubmitEvent } from '#ui/types'
// import { z } from 'zod'

// const initialState = {
//     incomeDate: ref(new Date()),
// }

// const schema = incomeFormZodObject

// const state = reactive({ ...initialState })
// type Schema = z.output<typeof schema>

// const df = new DateFormatter('en-GB', {
//     dateStyle: 'medium'
// })

// const modelValue = shallowRef(new CalendarDate(2022, 1, 10))
// async function onSubmit(event: FormSubmitEvent<Schema>) {
//     const incomeDate = event.data.incomeDate;
//     console.log(incomeDate);
//     console.log(state.incomeDate);
//     console.log(modelValue.value.toDate('UTC'));
//     // form submission logic
// }
</script>

<template>
    <main>
        <!-- <UForm :state="state" class="grid grid-cols-3 lg:grid-cols-6 gap-x-4"
                @submit="onSubmit">
        <UFormField name="incomeDate2">
            
                <UPopover>
                    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar" class="bg-sky-100 text-slate-800">
                        {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
                    </UButton>

                    <template #content>
                        <UCalendar v-model="modelValue" class="p-2" />
                    </template>
                </UPopover>
        </UFormField>
        <UButton type="submit" class="h-8 m-6">
            Submit
        </UButton>
        </UForm> -->
        <div>
            <h1 class="text-4xl font-extrabold">Welcome to the budget-app!</h1>
            <h1 class="text-4xl font-extrabold mb-5">About</h1>
            <p class="mb-5">FIN is designed to be a personal budgeting app to help people manage their finances and
                understand where their money is going. I've used a few different personal budgeting apps, but of those
                that I've tried most of them had something that I didn't like so I always went back to upkeeping a large
                spreadsheet of my transactions. This quickly becomes a bit difficult to manage and I've always been
                reluctant to add complicated functions to spreadsheets, mainly because I don't find them very easy to
                use.</p>
            <p class="mb-5">My aim here is to design an application that can be used to record my earnings,
                spending, and report on it in a way that makes sense to me.</p>

            <p class="mb-5">Personally I don't like linking my credit or debit accounts to budgeting apps, both from
                a personal security perspective and because I find there to be problems with this. Because I do most of
                my spending on my credit cards but use direct debits for regular payments my ideal would be to link both
                to a budgeting app, however, doing this generally means that individual items are added to the app which
                is great but when I pay off my card via direct debit that charge is then added to the app. It then
                reflects poorly on the app unless there's some way of removing an individual charge, which is normally a
                bit of a pain.</p>

            <p class="mb-5">It's for this reason that I am making this app manual. I believe that manually entering
                payments into the app also makes the spending of money feel more real. In the future I may look into
                implementing the Open Banking API, but for now this isn't part of my plan while I'm trying to get the
                app working to meet my personal requirements.</p>

            <p class="mb-5">If you came here to find out more about me you can veiw information <a class="text-blue-600"
                    href="https://samchapman.dev/">here</a> on my personal website.</p>
        </div>
    </main>
</template>

<style scoped></style>