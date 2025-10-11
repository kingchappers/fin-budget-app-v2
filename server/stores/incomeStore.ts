import { fetchAuthSession } from "@aws-amplify/auth";
import { defineStore } from "pinia";
import type { incomeFilter } from '~/types/incomeFilter';
import type { incomeType } from "~/types/incomeTypes";
import { useUserStore } from "./userStore";
import { useAuthenticator } from '@aws-amplify/ui-vue';

const incomeFilter: incomeFilter = {
    limit: 5,
    page: 0,
    userId: ''
}

export const useIncomeStore = defineStore('incomeStore', {
    state: () => {
        return {
            incomeList: {},
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
            incomeFilter.userId = userStore.userId;
            console.log(incomeFilter)
            const incomeList = await $fetch('/api/incomes/getIncomes', {
                method: 'get',
                headers: {
                    Authorisation: authorisation,
                    UserId: userStore.userId
                },
                params: {
                    incomeFilter
                },
            })
            console.log(incomeList)
            this.incomeList = incomeList || {}




            const auth = useAuthenticator();
            const userId = auth.user.userId;
            let token = ''
            const newIncomeList = await $fetch('https://dg2rxkailb.execute-api.eu-west-2.amazonaws.com/prod/income', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: {
                    userId
                }
            })
            console.log(newIncomeList)
            // this.incomeList = newIncomeList || {}
        },
    },
})

interface incomeList {
    incomes: incomeType[]
}