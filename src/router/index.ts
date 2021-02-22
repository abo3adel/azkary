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
            {
                path: 'notify',
                component: () => import('@/views/Notify.vue'),
            },
            {
                path: 'sebha',
                component: () => import('@/views/Sebha.vue'),
            },
        ],
    },
    {
        path: '/zikr/:slug',
        component: () => import('@/views/zikr/Show.vue'),
        props: true,
    },
    {
        path: '/settings',
        component: () => import('@/views/setting/Index.vue'),
        children: [
            {
                path: '/settings',
                redirect: '/settings/app',
            },
            {
                path: 'app',
                component: () => import('@/views/setting/AppSettings.vue'),
            },
            {
                path: 'control',
                component: () => import('@/views/setting/ControlSettings.vue'),
            },
            {
                path: 'sebha',
                component: () => import('@/views/setting/SebhaSettings.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
