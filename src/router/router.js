import { createWebHistory, createRouter } from "vue-router";

import Registration from '../components/Registration.vue';
import Main from "../components/Main.vue";

const routes = [
    { path: '/', redirect: '/main' },
    { path: '/login', component: Registration },
    { path: '/main', component: Main }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})