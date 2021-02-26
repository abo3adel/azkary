<template>
    <ion-content :fullscreen="true">
        <div
            class="relative shadow-sm select-none header h-2/5"
            :style="
                meta.color.length
                    ? `background: linear-gradient(60deg, var(--ion-color-primary, #3880ff) 0%, var(--ion-color-${meta.color}, #2dd36f) 100% );`
                    : ''
            "
        >
            <div class="text-center inner-header hero text-color">
                <h1 class="w-11/12 pt-10 mx-auto text-center">
                    <ion-icon
                        v-if="meta.type === 'svg'"
                        :src="`/assets/icons/${meta.name}.svg`"
                        class="w-14 h-14"
                    ></ion-icon>
                    <ion-icon
                        v-else
                        :icon="meta.name"
                        class="w-14 h-14"
                    ></ion-icon>
                </h1>
                <h1 class="text-lg">
                    {{ title }}
                </h1>
                <h1 class="pt-6 text-3xl">
                    <ion-icon
                        :icon="calculatorOutline"
                        class="w-8 h-8 mx-1 align-middle"
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
                <div
                    class="w-1/2 text-lg font-bold"
                    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
                >
                    {{ totalCount }}
                </div>
            </div>
            <div class="w-8/12 mx-auto text-center p-7">
                <div
                    class="w-16 h-16 p-3 mx-auto text-4xl transition duration-500 transform rounded-full shadow-2xl text-color hover:scale-125"
                    :class="{ 'hover:cursor-pointer': doneSaving }"
                    :style="`background-color: var(--ion-color-${meta.color})`"
                    @click="goToHome()"
                >
                    <ion-icon
                        :icon="reloadOutline"
                        class="animate-spin"
                        v-if="!doneSaving"
                    ></ion-icon>
                    <ion-icon :icon="chevronBackOutline" v-else></ion-icon>
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
        chevronBackOutline,
    } from 'ionicons/icons';
    import { defineComponent } from 'vue';
    // @ts-ignore
    import emitter from 'tiny-emitter/instance';
    import { UserEntity } from '@/schema/UserEntity';
    import db from '@/utils/db';

    export default defineComponent({
        name: 'ZikrStats',
        props: {
            title: { type: String, default: '' },
            meta: { type: Object },
            count: { type: Number, default: 1 },
            modal: {},
        },
        emits: ['go-home'],
        data() {
            return {
                azkarCount: 0,
                totalCount: 0,
                doneSaving: false,

                calculatorOutline,
                chevronBackOutline,
                reloadOutline,
            };
        },
        methods: {
            async saveToDB() {
                // this.azkarCount = JSON.parse(
                //     (await Storage.get({ key: 'azkarCount' })).value ?? 0
                // );

                // // increment azkar count
                // await Storage.set({
                //     key: 'azkarCount',
                //     value: `${this.azkarCount + this.count}`,
                // });

                const sql = (await db()).createQueryBuilder(
                    UserEntity,
                    'user_set'
                );

                this.azkarCount = (
                    await sql.select('azkarCount').execute()
                )[0].azkarCount;

                // update
                await (
                    await db()
                ).query(
                    'UPDATE user_settings SET azkarCount = azkarCount + ?',
                    [this.count]
                );

                this.doneSaving = true;
            },
            async goToHome() {
                if (!this.doneSaving) return;
                emitter.emit('go-home');
            },
            formatNum(num) {
                let si = [
                    { value: 1, symbol: '' },
                    { value: 1e3, symbol: 'k' },
                    { value: 1e6, symbol: 'M' },
                    { value: 1e9, symbol: 'G' },
                    { value: 1e12, symbol: 'T' },
                    { value: 1e15, symbol: 'P' },
                    { value: 1e18, symbol: 'E' },
                ];

                if (this.$i18n.locale === 'ar') {
                    si = [
                        { value: 1, symbol: '' },
                        { value: 1e3, symbol: ' ألف' },
                        { value: 1e6, symbol: ' مليون' },
                        { value: 1e9, symbol: ' مليار' },
                        { value: 1e12, symbol: ' بليون' },
                        { value: 1e15, symbol: ' بليار' },
                        { value: 1e18, symbol: ' تريليون' },
                    ];
                }

                const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
                let i;
                for (i = si.length - 1; i > 0; i--) {
                    if (num >= si[i].value) {
                        break;
                    }
                }
                return (
                    (num / si[i].value).toFixed(1).replace(rx, '$1') +
                    si[i].symbol
                );
            },
            getTotalCount() {
                const intval = setInterval(() => {
                    if (this.azkarCount) {
                        clearInterval(intval);
                        this.totalCount = this.formatNum(
                            this.azkarCount + this.count
                        );
                        return;
                    }
                    this.totalCount++;
                });
            },
        },
        mounted() {
            setTimeout(() => this.saveToDB(), 500);
            this.getTotalCount();
        },
        components: { IonContent, IonIcon },
    });
</script>
<style scoped>
    .header {
        background: linear-gradient(
            60deg,
            var(--ion-color-primary, #3880ff) 0%,
            var(--ion-color-danger, #eb445a) 100%
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

    @media screen and (max-width: 768px) and (orientation: landscape) {
        .pt-10 {
            padding-top: 0 !important;
        }
    }
</style>
