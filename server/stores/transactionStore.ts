import { fetchAuthSession } from "@aws-amplify/auth";
import { defineStore } from "pinia";
import type { transactionFilter } from '~/types/transactionFilter';
import type { transactionType } from "~/types/transactionTypes";
import { useUserStore } from "./userStore";

const session = await fetchAuthSession();
const userStore = useUserStore();
let authorisation = ''
if (session.tokens && session.tokens.idToken) {
    authorisation = session.tokens.idToken.toString()
} else {
    console.log('Error: Session token not found. Redirecting to login')
}

const transactionFilter: transactionFilter = {
    limit: 5,
    page: 0,
    userId: userStore.userId
}

export const useTransactionStore = defineStore('transactionStore', {
    state: () => {
        return {
            transactionsList: [] as object as transactionsList,
            status: '',
            userId: userStore.userId,
        }
    },
    actions: {
        async fetch() {
            const transactionList = await $fetch('/api/transactions/getTransactions', {
                method: 'get',
                headers: {
                    Authorisation: authorisation,
                    UserId: this.userId
                },
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