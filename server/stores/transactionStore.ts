import { fetchAuthSession } from "@aws-amplify/auth";
import { defineStore } from "pinia";
import type { transactionFilter } from '~/types/transactionFilter';
import type { transactionType } from "~/types/transactionTypes";
import { useUserStore } from "./userStore";

const transactionFilter: transactionFilter = {
    limit: 5,
    page: 0,
    userId: ''
}

export const useTransactionStore = defineStore('transactionStore', {
    state: () => {
        return {
            transactionsList: {} as transactionsList[],
            status: '',
            userId: '',
        }
    },
    actions: {
        async fetch() {
            const session = await fetchAuthSession();
            let authorisation = ''
            if (session.tokens && session.tokens.idToken) {
                authorisation = session.tokens.idToken.toString()
            } else {
                console.log('Error: Session token not found. Redirecting to login')
            }

            const userStore = useUserStore();
            transactionFilter.userId = userStore.userId;
            console.log(transactionFilter)
            const transactionList = await $fetch('/api/transactions/getTransactions', {
                method: 'get',
                headers: {
                    Authorisation: authorisation,
                    UserId: userStore.userId
                },
                params: {
                    transactionFilter
                },
            }) as transactionsList[]
            console.log(transactionList)
            this.transactionsList = transactionList 
        },
    },
})

interface transactionsList {
    transactions: transactionType[]
}