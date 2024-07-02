import { defineStore } from "pinia";

type storeUser = {
    user: object
}

export const useUserStore = defineStore('userStore', {
    state: (): storeUser => ({
        user: {
            login: 'registrator@mail.ru',
            username: 'Даша',
            role: 'registrator'
        }
    })
})