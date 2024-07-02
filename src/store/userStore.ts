import { defineStore } from "pinia";

type user = {
    username: string,
    id: string,
    role: string,
    login: string,
    password: string
}

type userStore = {
    loginUser: user,
    users: user[]
}

export const useUserStore = defineStore('userStore', {
    state: (): userStore => ({
        loginUser: {
            login: '',
            username: '',
            role: '',
            id: "",
            password: ""
        },
        users: []
    }),
    actions: {
        addLoginUser(user: user) {
            this.loginUser = user
        },
        addUsers(users: user[]) {
            this.users = users
        }
    }
})