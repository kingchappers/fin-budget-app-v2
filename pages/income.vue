<script setup lang="ts">
import IncomesForm from '~/components/incomes/incomesForm.vue';
import IncomesTable from '~/components/incomes/incomesTable.vue';
import { useIncomeStore } from '~/server/stores/incomeStore';

const incomeArray = useIncomeStore();
try {
    await callOnce(incomeArray.fetch)
} catch (e) {
    console.log(e)
}
</script>

<template>
    <main>
        <div>
            <h1 class="text-4xl font-extrabold">Incomes</h1>
            <IncomesForm />
            <IncomesTable />
        </div>
    </main>
</template>