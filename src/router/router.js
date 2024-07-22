import { createWebHistory, createRouter } from "vue-router";

import Registration from '../components/Registration.vue';
import Main from "../components/Main.vue";
import NoteEdit from "../components/NoteEdit.vue";

// После окончания разработки установить изначальный редирект на страницу авторизации

const routes = [
    { path: '/', redirect: '/main' },
    { path: '/main', name: 'toMain', component: Main },
    { path: '/login', component: Registration },
    { path: '/main', component: Main },
    { path: '/noteedit', component: NoteEdit }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})