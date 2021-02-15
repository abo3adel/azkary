import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/tabs/home',
    },
    {
        path: '/tabs',
        component: Tabs,
        children: [
            {
                path: 'home',
                component: () => import('@/views/Home.vue'),
            },
            {
                path: 'zikr',
                component: () => import('@/views/zikr/Index.vue'),
            },
        ],  
    },
    {
        path: '/zikr/:slug',
        component: () => import('@/views/zikr/Show.vue'),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
