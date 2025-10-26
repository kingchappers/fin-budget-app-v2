<script setup lang="ts">
import IncomesForm from '~/components/incomes/incomesForm.vue';
import IncomesTable from '~/components/incomes/incomesTable.vue';

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