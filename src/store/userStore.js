import { defineStore } from "pinia";
import { getRequest } from "../API/requests";
import { consts } from "../consts";

// После окончания разработки убрать фиксированно залогиненного юзера

export const useUserStore = defineStore('userStore', {
    state: () => ({
        loginUser: null,
        users: []
    }),
    actions: {
        addLoginUser(user) {
            this.loginUser = user
        },
        addUsers(users) {
            this.$state.users = users
        },
        async loadUsers() {
            getRequest(consts.PATH_SERVER + '/users').then(res=> {
                this.addUsers(res)
            })
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
        notes: []
    }),
    actions: {
        getNoteByNumber(number) {
            for(let i = 0; i < this.notes.length; i++) {
                if(this.notes[i].number == number) {
                    return this.notes[i]
                }
            }
        },
        addNotes(notes) {
            this.$state.notes = notes
        },
        addNote(note) {
            this.$state.notes.push(note)
        },
        updateNote(id, data) {
            for(let i = 0; i < this.notes.length; i++) {
                if(this.notes[i].id == id) {
                    this.notes[i] = data
                }
            }
        },
        async loadNotes() {
            getRequest(consts.PATH_SERVER + '/notes').then(res=> {
                this.addNotes(res)
            })
        }
    }
})