import { fetchAuthSession } from "@aws-amplify/auth";
import { defineStore } from "pinia";
import type { incomeFilter } from '~/types/incomeFilter';
import type { incomeType } from "~/types/incomeTypes";
import { useUserStore } from "./userStore";
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { useFetch } from "nuxt/app";

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
            const auth = useAuthenticator();
            const userId = auth.user.userId;
            let token = ''

            if (session.tokens && session.tokens.idToken) {
                token = session.tokens.idToken.toString()
                console.log('Session token found!');
            } else {
                console.log('Error: Session token not found. Redirecting to login')
            }
            const incomeList = await $fetch('https://530n5rqhl4.execute-api.eu-west-2.amazonaws.com/prod/getIncomes', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: {
                    userId: userId,
                }
            })
            console.log(incomeList)
            this.incomeList = incomeList || {}
        },
    },
})

interface incomeList {
    incomes: incomeType[]
}