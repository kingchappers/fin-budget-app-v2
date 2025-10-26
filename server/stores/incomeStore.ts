import { defineStore } from "pinia";
import type { incomeFilter } from '~/types/incomeFilter';
import type { incomeType } from "~/types/incomeTypes";
import { useAuth } from '~/composables/useAuth'
import { useAuthFetch } from '~/composables/useAuthFetch'

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
        }
    },
    actions: {
        async fetch() {
            const { authState, checkAuth } = useAuth()
            const authFetch = useAuthFetch()

            // Ensure auth tokens are available before making API call
            await checkAuth()
            if (!authState.value.tokens) {
                this.status = 'no-auth'
                console.warn('incomeStore.fetch: no auth tokens, aborting fetch')
                this.incomeList = []
                return
            }

            const userId = authState.value.user?.username || authState.value.user?.userId || authState.value.user?.attributes?.sub || ''

            try {
                const incomeList = await authFetch('https://530n5rqhl4.execute-api.eu-west-2.amazonaws.com/prod/getIncomes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: {
                        userId: userId,
                    }
                }) as incomeList[]

                this.incomeList = incomeList || []
                this.status = 'ok'
            } catch (err) {
                console.error('incomeStore.fetch error', err)
                this.status = 'error'
                this.incomeList = []
            }
        },
    },
})

interface incomeList {
    incomes: incomeType[]
}