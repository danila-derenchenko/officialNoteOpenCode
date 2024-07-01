import { createWebHistory, createRouter } from "vue-router";

import Registration from '../components/Registration.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Registration }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})