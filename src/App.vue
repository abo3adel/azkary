<template>
    <ion-app>
        <div
            class="relative z-10 flex items-center justify-center flex-shrink-0 w-full h-full text-center bg-gradient-to-tr from-gray-50 to-gray-200"
            v-if="slide"
        >
            <div class="w-full">
                <first-slide />
            </div>
        </div>

        <div class="absolute w-full h-full" v-if="firstTime">
            <first-time-slides
                @start="firstTime = false"
                @hide-slide="slide = false"
            />
        </div>
        <ion-router-outlet />
    </ion-app>
</template>

<script lang="ts">
    import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/vue';
    import { defineComponent, defineAsyncComponent } from 'vue';
    import 'reflect-metadata';
    import { setStyles } from '@/common/styleApp';
    import { Plugins } from '@capacitor/core';
    import confirmAppExit from './utils/confirmAppExit';
    import FirstSlide from '@/components/FirstSlide.vue';

    const { StatusBar, Storage, SplashScreen } = Plugins;

    export const COLORES = [
        { id: 'primary-fall', color: '#2655a8', lighter: '#3880ff' },
        { id: 'secondary', color: '#2985af', lighter: '#3dc2ff' },
        { id: 'tertiary', color: '#2d37a3', lighter: '#5260ff' },
        { id: 'success', color: '#1d8f4a', lighter: '#2dd36f' },
        { id: 'warning', color: '#9e7e16', lighter: '#ffc409' },
        { id: 'danger', color: '#962534', lighter: '#eb445a' },
        { id: 'gold', color: '#916c10', lighter: '#daa520' },
        { id: 'teal', color: '#1abc7e', lighter: '#31c38b' },
        { id: 'pink', color: '#e91e63', lighter: '#eb3573' },
        { id: 'purple', color: '#9c27b0', lighter: '#a63db8' },
    ];

    const FirstSlides = defineAsyncComponent({
        loader: () => import('@/components/FirstTimeSlides.vue'),
        // loadingComponent: Loading,
    });

    export default defineComponent({
        name: 'App',
        components: {
            FirstSlide,
            IonApp,
            IonRouterOutlet,
            'first-time-slides': FirstSlides,
        },
        inject: ['lang', 'dark', 'fontSize', 'fontType', 'theme'],
        data() {
            return {
                firstTime: false,
                slide: true,
            };
        },
        methods: {
            async confirmExit() {
                await confirmAppExit(this);
            },
        },
        async mounted() {
            // first type run
            const isFirstRun = (await Storage.get({ key: 'firstDone' })).value;

            if (!isFirstRun || isFirstRun === 'undefined') {
                this.firstTime = true;

                Storage.set({ key: 'firstDone', value: 'yes' });

                // db seeding in firstTimeSlides component
            }

            // @ts-ignore
            this.$i18n.locale = this.lang;

            // @ts-ignore
            if (this.lang === 'ar') {
                document.documentElement.dir = 'rtl';
                document.documentElement.classList.add('theme-rtl');
            }

            // @ts-ignore
            if (this.dark) {
                document.documentElement.classList.add('theme-dark');
            }

            setStyles(
                // @ts-ignore
                this.theme,
                // @ts-ignore
                this.fontType,
                // @ts-ignore
                this.fontSize
            );

            if (isPlatform('hybrid') && isFirstRun) {
                // set statusbar background color
                StatusBar.setBackgroundColor({
                    // @ts-ignore
                    color: COLORES.filter((x) => x.id === this.theme)[0].color,
                });
            }

            document.addEventListener('ionBackButton', (ev: any) => {
                ev.detail.register(5, async () => {
                    if (
                        !window.history.length ||
                        window.history.length < 2 ||
                        this.$route.path.indexOf('tabs') > -1
                    ) {
                        await this.confirmExit();
                        return;
                    }
                });

                ev.detail.register(10, (processNextHandler: any) => {
                    processNextHandler();
                });
            });

            if (isFirstRun) {
                setTimeout(() => {
                    SplashScreen.hide();
                    this.slide = false;
                }, 300);
            }

            // remove splash loader
            setTimeout(
                () =>
                    ((document.querySelector(
                        '.splash-loader'
                    ) as HTMLDivElement).style.display = 'none'),
                301
            );
        },
    });
</script>
<style>
    img.icon {
        width: 100% !important;
        height: 100% !important;
        margin-right: auto;
        margin-left: auto;
    }
</style>
