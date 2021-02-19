<template>
    <ion-page
        :style="
            color !== 'primary'
                ? `--ion-color-primary: var(--ion-color-${color});--ion-color-primary-contrast: var(--ion-color-${color}-contrast)`
                : ''
        "
    >
        <ion-toolbar color="primary">
            <ion-buttons slot="start">
                <ion-button color="light">
                    <ion-icon :icon="menuOutline" />
                    <ion-label class="hidden sm:inline-block">
                        {{ $t('sebha.list') }}
                    </ion-label>
                </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
                <ion-button color="light" @click="add">
                    <ion-icon :icon="addOutline" />
                    <ion-label class="hidden sm:inline-block">
                        {{ $t('sebha.add') }}
                    </ion-label>
                </ion-button>
                <ion-button color="light" @click.prevent="toggleTheme">
                    <ion-icon :icon="colorPaletteOutline" />
                    <ion-label class="hidden sm:inline-block">
                        {{ $t('sebha.theme') }}
                    </ion-label>
                </ion-button>
                <ion-button color="light" @click="toggleColor">
                    <ion-icon :icon="colorFillOutline" />
                    <ion-label class="hidden sm:inline-block">
                        {{ $t('sebha.color') }}
                    </ion-label>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-content :fullscreen="true" class="select-none">
            <div
                class="flex h-full text-white bg-fixed bg-no-repeat bg-cover"
                @click.prevent="onClick()"
                style="background-image: url('/assets/img/ka3ba2.jpg')"
            >
                <div class="flex w-full h-full bg-black bg-opacity-20">
                    <div
                        class="m-auto text-6xl font-semibold"
                        v-show="theme === 'base'"
                    >
                        <div id="container" class="releative"></div>
                    </div>
                    <div
                        class="relative m-auto overflow-hidden border rounded-full w-80 h-80 border-primary-400"
                        v-show="theme === 'dev'"
                    >
                        <div
                            class="absolute bottom-0 w-full h-5 transition-all duration-500 opacity-95 bg-primary-600"
                            :style="`height: ${svgHeight}rem`"
                        >
                            <svg
                                class="w-full -mt-7 waves"
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
                                        fill="var(--ion-color-primary)"
                                    />
                                    <use
                                        xlink:href="#gentle-wave"
                                        x="40"
                                        y="7"
                                        fill="var(--ion-color-primary)"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div class="absolute flex w-full h-full">
                            <div class="m-auto">
                                <div class="flex flex-col text-center">
                                    <div class="mx-4 font-semibold break-all">
                                        {{ sebha.body }}
                                    </div>
                                    <div>
                                        <span class="text-6xl">{{
                                            sebha.current
                                        }}</span>
                                        <span class="text-3xl">
                                            /{{ sebha.max }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ion-fab
                vertical="top"
                horizontal="end"
                slot="fixed"
                @click.prevent="resetSebha"
            >
                <ion-fab-button>
                    <ion-icon :icon="closeOutline" />
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import {
        IonPage,
        IonToolbar,
        IonButtons,
        IonButton,
        IonContent,
        IonLabel,
        IonIcon,
        IonFab,
        IonFabButton,
        alertController,
    } from '@ionic/vue';
    import {
        menuOutline,
        colorPaletteOutline,
        colorFillOutline,
        addOutline,
        closeOutline,
        trashBinSharp,
    } from 'ionicons/icons';
    // @ts-ignore
    import ProgressBar from 'progressbar.js/dist/progressbar';
    import { Plugins } from '@capacitor/core';

    const { Storage } = Plugins;
    import { Sebha } from '@/entities/Sebha';
    import db from '@/utils/db';
    import loader from '@/utils/loader';
    import { getConnection } from 'typeorm';
    import toast from '@/utils/toast';

    @Options({
        components: {
            IonPage,
            IonToolbar,
            IonButtons,
            IonButton,
            IonContent,
            IonLabel,
            IonIcon,
            IonFab,
            IonFabButton,
        },
    })
    export default class SebhaView extends Vue {
        bar: any;
        tasabeeh: Sebha[] = [];
        active = 0;
        sebha = new Sebha();
        theme = 'base';
        svgHeight = 0;
        color = 'primary';

        menuOutline = menuOutline;
        colorPaletteOutline = colorPaletteOutline;
        colorFillOutline = colorFillOutline;
        addOutline = addOutline;
        closeOutline = closeOutline;
        trashBinSharp = trashBinSharp;

        async loadTasabeeh() {
            await loader.show();
            this.tasabeeh = await (await db()).getRepository(Sebha).find();
            await loader.hide();
            this.sebha = this.tasabeeh[this.tasabeeh.length - 1];

            this.bar?.set(this.sebha.current / this.sebha.max);
            this.svgHeight = this.calcHeight() * this.sebha.current;
        }

        /**
         * calculate dev theme container div height
         * ?eight is mesured by rem, div max-height -> 20rem
         * ?calculate with 19 to show animation event on last number
         *
         * @returns number
         */
        calcHeight(): number {
            return 19 / this.sebha.max;
        }

        async onClick() {
            this.sebha.current++;

            if (this.sebha.current >= this.sebha.max) {
                this.bar?.set(1);
                this.svgHeight = 20;

                // increment readed value
                await getConnection().query(
                    'UPDATE tasabeeh AS ts SET readed = readed +1 WHERE id = ?',
                    [this.sebha.id]
                );

                // reset
                this.sebha.current = 0;
                // will be incremented below
                // then set after increment to zero
                this.svgHeight = -this.calcHeight();
            }

            this.bar?.animate(this.sebha.current / this.sebha.max);

            this.svgHeight += this.calcHeight();

            // update db with current value
            await getConnection()
                .createQueryBuilder(Sebha, 'tasabeeh')
                .update()
                .set({ current: this.sebha.current })
                .where({ id: this.sebha.id })
                .execute();
        }

        /**
         * toggle the avaliable two thems
         */
        async toggleTheme() {
            this.theme = this.theme === 'dev' ? 'base' : 'dev';

            if (this.theme === 'base') {
                if (!this.bar) this.setProgressBar();

                this.bar?.set(this.sebha.current / this.sebha.max);
            }

            // save current theme
            await Storage.set({ key: 'sebha_theme', value: this.theme });
        }

        /**
         * toggle between avaliable theme colors
         */
        async toggleColor() {
            const colors = [
                'primary',
                'secondary',
                'success',
                'danger',
                'warn',
                'gold',
                'tertiary',
            ];
            let inx = colors.findIndex((x) => x === this.color) + 1;

            if (inx > colors.length) {
                inx = 0;
            }

            this.color = colors[inx];

            await Storage.set({ key: 'sebha_color', value: this.color });
        }

        async add() {
            const alert = await alertController.create({
                cssClass: 'ion-alert',
                header: this.$t('zikr.add.header'),
                inputs: [
                    {
                        type: 'textarea',
                        name: 'body',
                        placeholder: this.$t('sebha.add.pl'),
                        attributes: {
                            dir: 'rtl',
                        },
                    },
                    {
                        type: 'number',
                        name: 'max',
                        placeholder: this.$t('sebha.add.max'),
                        value: 100,
                        attributes: {
                            dir: 'rtl',
                            inputmode: 'numeric',
                        },
                    },
                ],
                buttons: [
                    {
                        text: this.$t('zikr.add.cancel'),
                        role: 'cancel',
                        cssClass: 'cancelBtn',
                    },
                    {
                        text: this.$t('zikr.add.save'),
                        cssClass: 'submitBtn',
                        handler: async (ev: {
                            body: string;
                            max: number;
                        }): Promise<void> => {
                            if (!ev.body || !ev.body.length) {
                                toast(this.$t('sebha.err.noBody'));
                                return;
                            }

                            await loader.show();

                            let sebha = new Sebha();
                            sebha.body = ev.body;
                            sebha.max = ev.max;

                            sebha = await (await db())
                                .getRepository(Sebha)
                                .save(sebha);

                            // select it as current active sebha
                            this.tasabeeh.push(sebha);
                            this.active = this.tasabeeh.length - 1;
                            this.sebha = sebha;

                            // reset progress
                            this.updateProgress();

                            await loader.hide();
                        },
                    },
                ],
            });
            await alert.present();
        }

        async resetSebha() {
            if (!this.sebha.current) return;

            await loader.show();
            await getConnection()
                .createQueryBuilder(Sebha, 'tasabeeh')
                .update()
                .set({ current: 0 })
                .where({ id: this.sebha.id })
                .execute();

            // reset
            this.sebha.current = 0;
            this.updateProgress();
            await loader.hide();
        }

        updateProgress() {
            this.svgHeight = this.calcHeight() * this.sebha.current;
            this.bar?.set(this.sebha.current / this.sebha.max);
        }

        /**
         * iniate progress bar
         */
        setProgressBar() {
            this.bar = new ProgressBar.Circle(
                document.querySelector('#container'),
                {
                    color: 'var(--ion-color-primary)',
                    strokeWidth: 4,
                    trailWidth: 1,
                    easing: 'easeInOut',
                    trailColor: 'var(--ion-color-primary)',
                    duration: 600,
                    text: {
                        autoStyleContainer: false,
                    },
                    from: { color: '#3171e0', width: 2 },
                    to: { color: '#28ba62', width: 5 },
                    step: (state: any, circle: any) => {
                        circle.path.setAttribute('stroke', state.color);
                        circle.path.setAttribute('stroke-width', state.width);
                        const value = Math.round(
                            circle.value() * this.sebha.max ?? 10
                        );
                        if (value === 0 || !this.sebha.max) {
                            circle.setText('');
                        } else {
                            circle.setText(`${value}/${this.sebha.max ?? 10}`);
                        }
                    },
                }
            );
            this.bar.text.style.fontSize = 'inherit'; // control with tailwind
        }

        beforeMount() {
            Storage.get({ key: 'sebha' }).then(
                (r) => (this.active = parseInt(r.value ?? '0'))
            );

            Storage.get({ key: 'sebha_theme' }).then(
                (r) => (this.theme = r.value ?? 'dev')
            );

            Storage.get({ key: 'sebha_color' }).then(
                (r) => (this.color = r.value ?? 'primary')
            );
        }

        mounted() {
            if (this.theme !== 'dev') {
                this.setProgressBar();
            }
            this.loadTasabeeh();
        }
    }
</script>
<style scoped>
    .waves {
        height: 15vh;
        margin-bottom: -7px; /*Fix for safari gap*/
        min-height: 100px;
        max-height: 150px;
    }
    .parallax > use {
        animation: move-forever 10s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    }
    .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 1s;
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
