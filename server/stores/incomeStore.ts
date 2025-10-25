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
                
                // Wait for auth to be ready
                const auth = useAuthenticator();
                if (!auth.user) {
                    console.log('Waiting for auth to initialize...');
                    await new Promise(resolve => setTimeout(resolve, 500));
                }

                const session = await fetchAuthSession();
                if (!session?.tokens?.idToken) {
                    throw new Error('No valid session token found');
                }

                const token = session.tokens.idToken.toString();
                const userId = auth.user?.userId;

                if (!userId) {
                    throw new Error('No user ID found');
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
                }) as incomeList[];

                this.incomeList = incomeList || [];
            } catch (error: unknown) {
                console.error('Error fetching income:', error);
                if (error instanceof Error) {
                    this.error = error.message;
                } else {
                    this.error = String(error);
                }
                this.incomeList = [];
            } finally {
                this.isLoading = false;
            }
        },
    },
});

interface incomeList {
    incomes: incomeType[]
}