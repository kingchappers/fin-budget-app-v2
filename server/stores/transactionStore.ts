import { defineStore } from "pinia";
import { ref } from "vue";
import type { transactionFilter } from '~/types/transactionFilter';
import type { transactionType } from "~/types/transactionType";

const transactionFilter: transactionFilter = {
    limit: 5,
    page: 0,
    userId: ''
}

export const useTransactionStore = defineStore('transactionStore', {
    state: () => {
        return {
            transactionsList: [] as object as transactionsList,
            status: '',
        }
    },
    actions: {
        async fetch() {
            const transactionList = await $fetch('/api/transactions/getTransactions', {
                method: 'get',
                params: {
                    transactionFilter
                },
            })
            this.transactionsList = transactionList
        },
    },
})

interface transactionsList {
    transactions: transactionType[]
}