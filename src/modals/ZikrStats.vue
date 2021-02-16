<template>
    <ion-content :fullscreen="true">
        <div
            class="relative shadow-sm select-none header h-1/3"
            :style="
                meta.color.length
                    ? `background: linear-gradient(60deg, var(--ion-color-primary) 0%, var(--ion-color-${meta.color}) 100% );`
                    : ''
            "
        >
            <div class="text-center inner-header hero text-color">
                <h1 class="pt-12 text-xl">{{ title }}</h1>
                <h1 class="pt-6 text-3xl">
                    <ion-icon
                        :icon="calculatorOutline"
                        class="mx-1 text-xl"
                    ></ion-icon>
                    {{ $t('zikr.stats.calc') }}
                </h1>
                <div class="absolute bottom-0 left-0 w-full">
                    <svg
                        class="relative w-full waves"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28"
                        preserveAspectRatio="none"
                        shape-rendering="auto"
                    >
                        <defs>
                            <path
                                id="gentle-wave"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                            />
                        </defs>
                        <g class="parallax">
                            <use
                                xlink:href="#gentle-wave"
                                x="48"
                                y="0"
                                fill="rgba(255, 255, 255, .4)"
                            />
                            <use
                                xlink:href="#gentle-wave"
                                x="48"
                                y="3"
                                fill="rgba(255, 255, 255, .5)"
                            />
                            <use
                                xlink:href="#gentle-wave"
                                x="48"
                                y="5"
                                fill="rgba(255, 255, 255, .2)"
                            />
                            <use
                                xlink:href="#gentle-wave"
                                x="40"
                                y="7"
                                fill="var(--ion-background-color)"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>

        <div class="select-none content ion-padding">
            <div
                class="flex flex-wrap p-2 text-center border border-gray-500 rounded-lg shadow-2xl"
            >
                <div class="w-1/2 font-semibold border-r border-gray-500">
                    {{ $t('zikr.stats.added') }}
                </div>
                <div class="w-1/2 text-lg font-bold">{{ count }}+</div>
            </div>
            <div
                class="flex flex-wrap p-2 my-5 text-center border border-gray-500 rounded-lg shadow-2xl"
            >
                <div class="w-1/2 font-semibold border-r border-gray-500">
                    {{ $t('zikr.stats.total') }}
                </div>
                <div class="w-1/2 text-lg font-bold">
                    {{ user.azkarCount + count }}
                </div>
            </div>
            <div class="w-8/12 mx-auto text-center p-7">
                <div
                    class="mx-auto text-xl text-color"
                    :class="{ 'hover:cursor-pointer': user.id }"
                    @click="goToHome()"
                >
                    <ion-icon
                        :icon="reloadOutline"
                        class="w-10 h-10 p-3 rounded-full shadow-lg animate-spin"
                        :style="
                            `background-color: var(--ion-color-${meta.color})`
                        "
                        v-if="!user.id"
                    ></ion-icon>
                    <ion-icon
                        class="w-10 h-10 p-3 rounded-full shadow-lg"
                        :icon="homeOutline"
                        :style="
                            `background-color: var(--ion-color-${meta.color})`
                        "
                        v-else
                    ></ion-icon>
                </div>
            </div>
        </div>
    </ion-content>
</template>

<script>
    import { IonContent, IonIcon } from '@ionic/vue';
    import {
        calculatorOutline,
        reloadOutline,
        homeOutline,
    } from 'ionicons/icons';
    import { defineComponent } from 'vue';
    import { Plugins } from '@capacitor/core';
    import { getConnection } from 'typeorm';
    import { User } from '@/entities/User';

    const { Storage } = Plugins;

    export default defineComponent({
        name: 'ZikrStats',
        props: {
            title: { type: String, default: '' },
            meta: { type: Object },
            count: { type: Number, default: 1 },
        },
        data() {
            return {
                user: {
                    azkarCount: 0,
                },
                calculatorOutline,
                homeOutline,
                reloadOutline,
            };
        },
        methods: {
            async saveToDB() {
                this.user = JSON.parse(
                    (await Storage.get({ key: 'user' })).value
                );
                const fontSize = (await Storage.get({ key: 'fontSize' })).value;
                const theme = (await Storage.get({ key: 'theme' })).value;

                // update user with new values
                return await getConnection()
                    .createQueryBuilder(User, 'users')
                    .update()
                    .set({ azkarCount: this.user.azkarCount + this.count })
                    .set({ fontSize })
                    .set({ theme })
                    .execute();
            },
            goToHome() {
                if (!this.user.id) return;
                this.$router.push('/tabs/home');
            },
        },
        mounted() {
            setTimeout(() => this.saveToDB(), 5000);
        },
        components: { IonContent, IonIcon },
    });
</script>
<style scoped>
    .header {
        background: linear-gradient(
            60deg,
            var(--ion-color-primary) 0%,
            var(--ion-color-danger) 100%
        );
    }
    .waves {
        height: 15vh;
        margin-bottom: -7px; /*Fix for safari gap*/
        min-height: 100px;
        max-height: 150px;
    }

    /* Animation */

    .parallax > use {
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    }
    .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
    }
    .parallax > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
    }
    .parallax > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
    }
    .parallax > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
    }
    @keyframes move-forever {
        0% {
            transform: translate3d(-90px, 0, 0);
        }
        100% {
            transform: translate3d(85px, 0, 0);
        }
    }
    /*Shrinking for mobile*/
    @media (max-width: 768px) {
        .waves {
            height: 40px;
            min-height: 40px;
        }
    }
</style>
