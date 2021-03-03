import { CategoryType } from '@/schema/CategoryEntity';
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
                props: { type: CategoryType.Zikr },
                component: () => import('@/views/items/Index.vue'),
            },
            {
                path: 'du3a',
                props: { type: CategoryType.Du3a },
                component: () => import('@/views/items/Index.vue'),
            },
            {
                path: 'sebha',
                component: () => import('@/views/Sebha.vue'),
            },
        ],
    },
    {
        path: '/about',
        component: () => import('@/views/About.vue'),
    },
    {
        path: '/notifiy_azkar',
        component: () => import('@/views/Notify.vue'),
    },
    {
        path: '/zikr/:slug',
        component: () => import('@/views/items/Show.vue'),
        props: { type: CategoryType.Zikr },
    },
    {
        path: '/du3a/:slug',
        component: () => import('@/views/items/Show.vue'),
        props: { type: CategoryType.Du3a },
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
                path: 'azkar',
                component: () => import('@/views/setting/AzkarSettings.vue'),
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
