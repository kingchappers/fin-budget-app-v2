import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            userId: "",
            username: "",

        }
    },
    actions: {
        initStore(userId: string) {
            this.userId = userId
        },
    },
})
