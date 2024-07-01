import { defineStore } from "pinia";

type userStoreType = {
    login: string,
    role: string
}

export const useUserStore = defineStore('userInfo', {
    state: ():userStoreType => {
        return {
            login: '',
            role: ''
        }
    }
})