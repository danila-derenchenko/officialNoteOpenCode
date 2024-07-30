import { defineStore } from "pinia";

// После окончания разработки убрать фиксированно залогиненного юзера

export const useUserStore = defineStore('userStore', {
    state: () => ({
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
        addLoginUser(user) {
            this.loginUser = user
        },
        addUsers(users) {
            this.users = users
        },
        getExecutors() {
            let array = []
            for(let i = 0; i < this.users.length; i++) {
                if(this.users[i].role == 'executor') {
                    array.push(this.users[i])
                }
            }
            return array
        },
        getSigners() {
            let array = []
            for(let i = 0; i < this.users.length; i++) {
                if(this.users[i].role == 'signer') {
                    array.push(this.users[i])
                }
            }
            return array
        },
        getRegistrators() {
            let array = []
            for(let i = 0; i < this.users.length; i++) {
                if(this.users[i].role == 'registrator') {
                    array.push(this.users[i])
                }
            }
            return array
        },
        getCoordinators() {
            let array = []
            for(let i = 0; i < this.users.length; i++) {
                if(this.users[i].role == 'coordinator') {
                    array.push(this.users[i])
                }
            }
            return array
        }
    }
})

export const useNoteStore = defineStore('noteStore', {
    state: () => ({
        notes: [
            {
                number: 1,
                status: 'created',
                createData: '2024-06-01',
                regNumber: '08/5',
                regData: '2024-06-01',
                summary: '',
                whom: '',
                executor: '',
                coordinator: '',
                signer: '',
                registrator: '',
                description: ''
            },
            {
                number: 2,
                status: 'onAgreed',
                createData: '2024-08-01',
                regNumber: '08/5',
                regData: '2024-06-01',
                summary: '',
                whom: '',
                executor: '',
                coordinator: '',
                signer: '',
                registrator: '',
                description: ''
            }
        ]
    }),
    actions: {
        getNoteByNumber(number) {
            for(let i = 0; i < this.notes.length; i++) {
                if(this.notes[i].number == number) {
                    return this.notes[i]
                }
            }
        }
    }
})