import { createWebHistory, createRouter } from "vue-router";

import Registration from '../components/Registration.vue';
import Main from "../components/Main.vue";
import NoteEdit from "../components/NoteEdit.vue";

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/main', name: 'toMain', component: Main },
    { path: '/login', name: 'toLogin', component: Registration },
    { path: '/main', component: Main },
    { path: '/noteedit/:id', component: NoteEdit, name: 'toNoteEdit' }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})