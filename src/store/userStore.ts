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

type note = {
    number: string,
    status: string,
    createData: string,
    regNumber: string,
    regData: string,
    summary: string,
    whom: string,
    executor: string,
    coordinator: string,
    signer: string,
    registrator: string,
    description: string
}

type noteStore = {
    notes: note[]
}

// После окончания разработки убрать фиксированно залогиненного юзера

export const useUserStore = defineStore('userStore', {
    state: (): userStore => ({
        loginUser: {
            login: 'executor@mail.ru',
            username: 'Иванов Никита',
            role: 'executor',
            id: "b74e",
            password: "12345678"
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

export const useNoteStore = defineStore('noteStore', {
    state: (): noteStore => ({
        notes: [
            {
                number: '1',
                status: 'create',
                createData: '25.03.2024',
                regNumber: '08/5',
                regData: '26.03.2024',
                summary: '',
                whom: '',
                executor: '',
                coordinator: '',
                signer: '',
                registrator: '',
                description: ''
            }
        ]
    })
})