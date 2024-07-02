import { createWebHistory, createRouter } from "vue-router";

import Registration from '../components/Registration.vue';
import Main from "../components/Main.vue";

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/main', name: 'toMain', component: Main },
    { path: '/login', component: Registration },
    { path: '/main', component: Main }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})