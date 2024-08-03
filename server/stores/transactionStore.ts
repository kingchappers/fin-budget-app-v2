import { useFetch } from "nuxt/app";
import { defineStore } from "pinia";
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
            const { data: transactionsData, status, error } = await useFetch('/api/transactions/getTransactions', {
                method: 'get',
                params: {
                    transactionFilter
                },
            })
            this.transactionsList = transactionsData,
            this.status = status
        }
    }
})

interface transactionsList {
    transactions: transactionType[]
}
