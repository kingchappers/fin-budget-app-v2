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
            incomeList: [] as incomeList[],
            status: '',
            userId: '',
            isLoading: false,
            error: null as string | null
        }
    },
    actions: {
        async fetch() {
            try {
                this.isLoading = true;
                this.error = null;

                const session = await fetchAuthSession();
                const auth = useAuthenticator();

                if (!auth.user) {
                    this.error = 'Please log in to view your incomes';
                    return;
                }

                const userId = auth.user.userId;
                let token = ''

                if (session.tokens?.idToken) {
                    token = session.tokens.idToken.toString()
                    console.log('Session token found!');
                } else {
                    this.error = 'Session expired. Please log in again.';
                    return;
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
                }) as incomeList[]

                this.incomeList = incomeList || {}

            } catch (error) {
                console.error('Error fetching incomes:', error);
                this.error = 'Failed to load incomes. Please try again.';
            } finally {
                this.isLoading = false;
            }
        },
    },
})

interface incomeList {
    incomes: incomeType[]
}