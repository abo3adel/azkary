<template>
    <ion-page
        :style="
            color !== 'primary'
                ? `--ion-color-primary: var(--ion-color-${color});--ion-color-primary-contrast: var(--ion-color-${color}-contrast)`
                : ''
        "
        id="sebhaPage"
    >
        <ion-toolbar color="primary">
            <ion-buttons slot="start">
                <ion-menu-button @click="setMenuItemWidth"></ion-menu-button>
            </ion-buttons>
            <ion-buttons slot="end">
                <!-- <ion-button color="light" @click="add">
                    <ion-icon slot="start" :icon="addOutline" />
                    <span class="hidden sm:inline-block">
                        {{ $t('sebha.addt') }}
                    </span>
                </ion-button> -->
                <ion-button color="light" @click.prevent="togglesebhaTheme">
                    <ion-icon slot="start" :icon="colorPaletteOutline" />
                    <span class="hidden sm:inline-block">
                        {{ $t('sebha.sebhaTheme') }}
                    </span>
                </ion-button>
                <ion-button color="light" @click="toggleColor">
                    <ion-icon slot="start" :icon="colorFillOutline" />
                    <span class="hidden sm:inline-block">
                        {{ $t('sebha.color') }}
                    </span>
                </ion-button>
                <ion-button
                    color="light"
                    @click="locked = !locked"
                    class="mx-auto"
                >
                    <ion-icon
                        slot="start"
                        :icon="lockOpenOutline"
                        v-if="!locked"
                    />
                    <ion-icon slot="start" :icon="lockClosedOutline" v-else />
                    <span class="hidden sm:inline-block">
                        {{ locked ? $t('sebha.unlock') : $t('sebha.lock') }}
                    </span>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-split-pane content-id="sebha-main-content" class="mt-14">
            <ion-content
                class="bg-center bg-cover select-none sebha-con"
                id="sebha-main-content"
            >
                <div
                    class="flex w-full h-full text-white bg-black main bg-opacity-20"
                    @click.prevent="config.touch ? onClick() : null"
                >
                    <div class="flex w-full h-full">
                        <div
                            class="relative m-auto overflow-hidden w-80 h-80"
                            v-show="sebhaTheme === 'base'"
                        >
                            <Progress
                                id="baseSebha"
                                :color="barColor"
                                ref="bar"
                            >
                                <sebha-meta :sebha="sebha" />
                            </Progress>
                        </div>

                        <div
                            class="relative m-auto overflow-hidden border rounded-full w-96 h-96 border-primary-400"
                            v-show="sebhaTheme === 'dev'"
                        >
                            <div
                                class="absolute bottom-0 w-full h-5 duration-500 ease-in-out opacity-95 bg-primary-600"
                                :style="
                                    `transition-property: height;height: ${svgHeight}rem`
                                "
                            >
                                <svg
                                    class="w-full transition-all duration-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    preserveAspectRatio="none"
                                    shape-rendering="auto"
                                    viewBox="0 0 120 28"
                                    style="margin-top: -4.5rem;"
                                    v-pre
                                >
                                    <defs>
                                        <filter id="goo">
                                            <feGaussianBlur
                                                in="SourceGraphic"
                                                stdDeviation="1"
                                                result="blur"
                                            />
                                            <feColorMatrix
                                                in="blur"
                                                mode="matrix"
                                                values="
              1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 13 -9"
                                                result="goo"
                                            />
                                            <xfeBlend
                                                in="SourceGraphic"
                                                in2="goo"
                                            />
                                        </filter>
                                        <path
                                            id="wave"
                                            d="M 0,10 C 80,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
                                        />
                                    </defs>

                                    <use
                                        id="wave3"
                                        class="wave"
                                        xlink:href="#wave"
                                        x="0"
                                        y="-2"
                                    ></use>
                                    <use
                                        id="wave2"
                                        class="wave"
                                        xlink:href="#wave"
                                        x="0"
                                        y="0"
                                    ></use>

                                    <g class="gooeff" filter="url(#goo)">
                                        <circle
                                            class="drop drop1"
                                            cx="20"
                                            cy="2"
                                            r="8.8"
                                        />
                                        <circle
                                            class="drop drop2"
                                            cx="25"
                                            cy="2.5"
                                            r="7.5"
                                        />
                                        <circle
                                            class="drop drop3"
                                            cx="16"
                                            cy="2.8"
                                            r="9.2"
                                        />
                                        <circle
                                            class="drop drop4"
                                            cx="18"
                                            cy="2"
                                            r="8.8"
                                        />
                                        <circle
                                            class="drop drop5"
                                            cx="22"
                                            cy="2.5"
                                            r="7.5"
                                        />
                                        <circle
                                            class="drop drop6"
                                            cx="26"
                                            cy="2.8"
                                            r="9.2"
                                        />
                                        <circle
                                            class="drop drop1"
                                            cx="5"
                                            cy="4.4"
                                            r="8.8"
                                        />
                                        <circle
                                            class="drop drop2"
                                            cx="5"
                                            cy="4.1"
                                            r="7.5"
                                        />
                                        <circle
                                            class="drop drop3"
                                            cx="8"
                                            cy="3.8"
                                            r="9.2"
                                        />
                                        <circle
                                            class="drop drop4"
                                            cx="3"
                                            cy="4.4"
                                            r="8.8"
                                        />
                                        <circle
                                            class="drop drop5"
                                            cx="7"
                                            cy="4.1"
                                            r="7.5"
                                        />
                                        <circle
                                            class="drop drop6"
                                            cx="10"
                                            cy="4.3"
                                            r="9.2"
                                        />

                                        <circle
                                            class="drop drop1"
                                            cx="1.2"
                                            cy="5.4"
                                            r="8.8"
                                        />
                                        <circle
                                            class="drop drop2"
                                            cx="5.2"
                                            cy="5.1"
                                            r="7.5"
                                        />
                                        <circle
                                            class="drop drop3"
                                            cx="10.2"
                                            cy="5.3"
                                            r="9.2"
                                        />
                                        <circle
                                            class="drop drop4"
                                            cx="3.2"
                                            cy="5.4"
                                            r="8.8"
                                        />
                                        <circle
                                            class="drop drop5"
                                            cx="14.2"
                                            cy="5.1"
                                            r="7.5"
                                        />
                                        <circle
                                            class="drop drop6"
                                            cx="17.2"
                                            cy="4.8"
                                            r="9.2"
                                        />

                                        <circle
                                            class="drop drop1"
                                            cx="40"
                                            cy="2"
                                            r="8.8"
                                        />
                                        <circle
                                            class="drop drop2"
                                            cx="50"
                                            cy="2.5"
                                            r="7.5"
                                        />
                                        <circle
                                            class="drop drop3"
                                            cx="60"
                                            cy="2.8"
                                            r="9.2"
                                        />
                                        <circle
                                            class="drop drop4"
                                            cx="70"
                                            cy="2"
                                            r="8.8"
                                        />
                                        <circle
                                            class="drop drop5"
                                            cx="80"
                                            cy="2.5"
                                            r="7.5"
                                        />
                                        <circle
                                            class="drop drop6"
                                            cx="90"
                                            cy="2.8"
                                            r="9.2"
                                        />
                                        <circle
                                            class="drop drop1"
                                            cx="100"
                                            cy="4.4"
                                            r="8.8"
                                        />
                                        <circle
                                            class="drop drop2"
                                            cx="110"
                                            cy="4.1"
                                            r="7.5"
                                        />
                                        <use
                                            id="wave1"
                                            class="wave"
                                            xlink:href="#wave"
                                            x="0"
                                            y="1"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <sebha-meta :sebha="sebha" />
                        </div>
                    </div>
                </div>
                <ion-fab
                    vertical="top"
                    horizontal="start"
                    slot="fixed"
                    @click.prevent="resetSebha"
                    v-if="!locked"
                >
                    <ion-fab-button>
                        <ion-icon :icon="closeOutline" />
                    </ion-fab-button>
                </ion-fab>
                <ion-fab
                    vertical="top"
                    horizontal="end"
                    slot="fixed"
                    @click.prevent="remove"
                    v-if="!locked"
                >
                    <ion-fab-button>
                        <ion-icon :icon="trashBinOutline" />
                    </ion-fab-button>
                </ion-fab>

                <!-- bottom fabs -->
                <ion-fab
                    vertical="bottom"
                    horizontal="start"
                    slot="fixed"
                    @click.prevent="add"
                    v-if="!locked"
                >
                    <ion-fab-button>
                        <ion-icon :icon="addOutline" />
                    </ion-fab-button>
                </ion-fab>
                <ion-fab
                    vertical="bottom"
                    horizontal="end"
                    slot="fixed"
                    @click.prevent="add(null, true)"
                    v-if="!locked"
                >
                    <ion-fab-button>
                        <ion-icon :icon="createOutline" />
                    </ion-fab-button>
                </ion-fab>
            </ion-content>
            <ion-menu
                side="start"
                content-id="sebha-main-content"
                class="opacity-80"
            >
                <ion-toolbar color="primary">
                    <ion-title>{{ $t('sebha.menu.title') }}</ion-title>
                </ion-toolbar>
                <ion-content :fullscreen="true" class="select-none">
                    <div class="p-1">
                        <div
                            class="relative my-3 overflow-hidden transition-colors duration-500 rounded-md shadow-2xl card hover:cursor-pointer hover:bg-primary-600 hover:text-color"
                            :class="{
                                'bg-primary-600 text-color': s.id === sebha.id,
                            }"
                            v-for="(s, sinx) in tasabeeh"
                            :key="s.id"
                            @click.prevent="setSebha(s, sinx)"
                        >
                            <div
                                class="w-full px-2 py-1 bg-primary-600 rounded-tr-md rounded-tl-md text-color"
                            >
                                {{ s.body }}
                            </div>
                            <div class="relative flex flex-wrap p-2 card-body">
                                <div class="w-1/2 text-center">
                                    {{ $t('sebha.current') }}: {{ s.current }}
                                </div>
                                <div class="w-1/2 text-center">
                                    {{ $t('sebha.max') }}: {{ s.max }}
                                </div>
                                <div class="w-full text-center">
                                    {{ $t('sebha.total') }}: {{ s.readed }}
                                </div>
                            </div>
                            <div
                                class="absolute bottom-0 w-0 h-2 transition-all duration-500 rounded-sm bg-primary-600"
                                :style="
                                    `z-index: -1;width: ${(menuItemWidth /
                                        s.max) *
                                        s.current}px;
                                    background: linear-gradient(90deg, rgba(255,255,255,0.3) 50%, var(--ion-color-primary) 50%, rgba(0,0,0,0) 0), var(--ion-color-primary);
                                    background-size:1rem auto;`
                                "
                            ></div>
                        </div>
                    </div>
                </ion-content>
            </ion-menu>
        </ion-split-pane>
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
        IonTitle,
        IonMenuButton,
        IonMenu,
        IonSplitPane,
        alertController,
        menuController,
    } from '@ionic/vue';
    import {
        colorPaletteOutline,
        colorFillOutline,
        addOutline,
        closeOutline,
        trashBinOutline,
        lockOpenOutline,
        lockClosedOutline,
        menuOutline,
        createOutline,
    } from 'ionicons/icons';
    import { Plugins } from '@capacitor/core';

    import { Sebha } from '@/entities/Sebha';
    import db from '@/utils/db';
    import loader from '@/utils/loader';
    import { getConnection, getRepository } from 'typeorm';
    import toast from '@/utils/toast';
    import SebhaMeta from '@/components/SebhaMeta.vue';
    import { SebhaEntity, Sebha as ISebha } from '@/schema/SebhaEntity';
    import { Vibration } from '@ionic-native/vibration';
    import sound from '../utils/sound';
    import { Controls, loadConfigrations } from '../common/ControlConfig';
    import Progress from '@/components/Progress.vue';
    import { COLORES } from '@/App.vue';
    // @ts-ignore
    import emitter from 'tiny-emitter/instance';

    const { Storage, Modals } = Plugins;

    let busy = false;

    export const DEFUALT_BG = '/assets/img/pexels-tessa.jpg';

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
            IonTitle,
            IonMenuButton,
            IonMenu,
            IonSplitPane,
            SebhaMeta,
            Progress,
        },
        inject: ['theme'],
    })
    export default class SebhaView extends Vue {
        bar!: Progress;
        tasabeeh: Sebha[] = [];
        active = 0;
        sebha: ISebha = new Sebha();
        sebhaTheme = 'dev';
        svgHeight = 0;
        color = 'primary';
        barColor = COLORES[0].color;
        locked = false;
        menuItemWidth = 0;
        config = Controls;
        sound: any;

        colorPaletteOutline = colorPaletteOutline;
        colorFillOutline = colorFillOutline;
        addOutline = addOutline;
        closeOutline = closeOutline;
        trashBinOutline = trashBinOutline;
        lockOpenOutline = lockOpenOutline;
        lockClosedOutline = lockClosedOutline;
        menuOutline = menuOutline;
        createOutline = createOutline;

        async openMenu() {
            await menuController.open();
        }

        async closeMenu() {
            await menuController.close();
        }

        async setSebha(s: Sebha, inx: number) {
            this.sebha = s;
            this.active = inx;
            this.updateProgress();
            await this.closeMenu();
            await Storage.set({ key: 'sebha_active', value: `${inx}` });
        }

        async loadTasabeeh() {
            busy = true;
            await loader.show();
            this.tasabeeh = await (await db())
                .getRepository<Sebha>('sebha')
                .find();

            // get active sebha index
            this.active = parseInt(
                (await Storage.get({ key: 'sebha_active' })).value ??
                    `${this.tasabeeh.length - 1}`
            );

            this.sebha = this.tasabeeh[this.active];

            setTimeout(
                () => this.bar.set(this.sebha.current / this.sebha.max),
                50
            );
            this.svgHeight = this.calcHeight() * this.sebha.current;
            busy = false;

            // load config
            await this.loadConfig();

            await loader.hide();
        }

        async selectNext() {
            let inx = 0;
            const len = this.tasabeeh.length - 1;
            if (this.active >= len) {
                // if current was last then select first
            } else {
                inx = this.active + 1;
            }

            await this.setSebha(this.tasabeeh[inx], inx);
        }

        async loadConfig() {
            await loadConfigrations(this);

            this.loadOnEveryVisit();
        }

        async loadOnEveryVisit() {
            this.active = parseInt(
                (await Storage.get({ key: 'sebha' })).value ?? '0'
            );

            if (this.config.keyboard) {
                document.addEventListener('keyup', this.keyboardEv);
            } else {
                document.removeEventListener('keyup', this.keyboardEv);
            }

            // listen for volume keys
            if (this.config.hardKeys) {
                // @ts-ignore
                window.addEventListener(
                    'volumebuttonslistener',
                    this.addHardKeysEv
                );
            } else {
                // @ts-ignore
                window.removeEventListener(
                    'volumebuttonslistener',
                    this.addHardKeysEv
                );
            }

            this.togglesebhaTheme(false);
        }

        setMenuItemWidth() {
            this.menuItemWidth = 0;
            const el = document.querySelector(
                '.card-body.p-2'
            ) as HTMLDivElement;

            setTimeout(() => (this.menuItemWidth = el.offsetWidth), 500);
        }

        /**
         * calculate dev sebhaTheme progress-conatainer div height
         * ?eight is mesured by rem, div max-height -> 20rem
         * ?calculate with 19 to show animation event on last number
         *
         * @returns number
         */
        calcHeight(): number {
            return 20 / this.sebha.max;
        }

        async onClick() {
            // vibrate on click
            if (this.config.vibration) Vibration.vibrate(30);

            // play sound on click
            if (this.config.sound) sound.play('click');

            this.sebha.current++;

            if (this.sebha.current >= this.sebha.max) {
                this.bar?.set(1);
                this.svgHeight = 20;

                // increment readed value
                await getConnection().query(
                    'UPDATE tasabeeh AS ts SET readed = readed +1 WHERE id = ?',
                    [this.sebha.id]
                );

                // updated readed value
                this.sebha.readed++;

                // reset
                this.sebha.current = 0;
                if (this.config.autoNext) {
                    return await this.selectNext();
                }

                this.updateProgress();
                // will be incremented below
                // then set after increment to zero
                this.svgHeight = -this.calcHeight();
            }

            this.bar?.set(this.sebha.current / this.sebha.max);

            this.svgHeight += this.calcHeight();

            // update db with current value
            await getConnection()
                .createQueryBuilder(SebhaEntity, 'tasabeeh')
                .update()
                .set({ current: this.sebha.current })
                .where({ id: this.sebha.id })
                .execute();
        }

        /**
         * toggle the avaliable two thems
         */
        async togglesebhaTheme(toggle = true) {
            if (toggle) {
                this.sebhaTheme = this.sebhaTheme === 'dev' ? 'base' : 'dev';
            }

            if (this.sebhaTheme === 'base') {
                this.bar?.set(this.sebha.current / this.sebha.max);
            }

            // save current sebhaTheme
            await Storage.set({
                key: 'sebha_sebhaTheme',
                value: this.sebhaTheme,
            });
        }

        /**
         * toggle between avaliable sebhaTheme colors
         */
        async toggleColor() {
            const colors = [
                'primary-fall',
                'secondary',
                'success',
                'danger',
                'warning',
                'gold',
                'tertiary',
            ];
            let inx = colors.findIndex((x) => x === this.color) + 1;

            if (inx >= colors.length) {
                inx = 0;
            }

            this.color = colors[inx];

            this.setBarColor();

            await Storage.set({ key: 'sebha_color', value: this.color });
        }

        async add(ev: any = null, isEdit = false) {
            busy = true;

            const alert = await alertController.create({
                cssClass: 'ion-alert',
                header: this.$t('sebha.add.header'),
                inputs: [
                    {
                        type: 'textarea',
                        name: 'body',
                        placeholder: this.$t('sebha.add.pl'),
                        value: isEdit ? this.sebha.body : '',
                        attributes: {
                            dir: 'rtl',
                            rows: 5,
                        },
                    },
                    {
                        type: 'number',
                        name: 'max',
                        placeholder: this.$t('sebha.add.max'),
                        value: isEdit ? this.sebha.max : 100,
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
                        handler: () => {
                            busy = false;
                        },
                    },
                    {
                        text: this.$t('zikr.add.save'),
                        cssClass: 'submitBtn',
                        handler: async (ev: {
                            body: string;
                            max: number;
                        }): Promise<void> => {
                            if (!ev.body || !ev.body.length) {
                                toast(this.$t('zikr.err.noBody'));
                                busy = false;
                                return;
                            }

                            await loader.show();

                            let sebha = new Sebha();
                            sebha.body = ev.body;
                            sebha.max = ev.max;
                            sebha.current = 0;
                            sebha.readed = this.sebha.readed;

                            if (isEdit) sebha.id = this.sebha.id;

                            sebha = await (await db())
                                .getRepository<Sebha>('sebha')
                                .save(sebha);

                            // select it as current active sebha
                            if (isEdit) {
                                this.tasabeeh = this.tasabeeh.map((t) => {
                                    if (t.id === sebha.id) {
                                        t.body = sebha.body;
                                        t.max = sebha.max;
                                    }

                                    return t;
                                });
                            } else {
                                this.tasabeeh.push(sebha);
                                this.active = this.tasabeeh.length - 1;
                            }
                            this.sebha = sebha;

                            // reset progress
                            this.updateProgress();

                            await loader.hide();
                            busy = false;
                        },
                    },
                ],
            });
            await alert.present();
            // busy = false;
        }

        /**
         * delete current active sebha and activate next in list
         * if no more then assign to first
         * if no left then create new item with default values
         *
         * @returns void
         */
        async remove() {
            busy = true;
            const confirm = await Modals.confirm({
                title: this.$t('zikr.del.conf'),
                message: this.$t('sebha.delMess'),
                okButtonTitle: this.$t('zikr.del.okBtn'),
                cancelButtonTitle: this.$t('zikr.del.cancelBtn'),
            });

            if (!confirm.value) {
                busy = false;
                return;
            }

            await loader.show();

            await getRepository<Sebha>('sebha').delete({ id: this.sebha.id });

            this.tasabeeh.splice(this.active, 1);
            this.sebha.current = 0;
            this.updateProgress();

            // check if list has any more sebha items
            if (!this.tasabeeh.length) {
                // create new sebha with default values
                const sebha = new Sebha();
                sebha.body = this.$t('sebha.add.pl');
                sebha.max = 100;
                this.sebha = await getRepository<Sebha>('sebha').save(sebha);
                this.updateProgress();
                // @ts-ignore
                this.tasabeeh.push(this.sebha);
            } else {
                await this.selectNext();
            }

            await loader.hide();
            busy = false;
        }

        /**
         * reset current value
         */
        async resetSebha() {
            if (!this.sebha.current) return;

            await loader.show();
            await getConnection()
                .createQueryBuilder(SebhaEntity, 'tasabeeh')
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

        ionViewWillLeave() {
            document.removeEventListener('keyup', this.keyboardEv);

            // @ts-ignore
            window.removeEventListener(
                'volumebuttonslistener',
                this.addHardKeysEv
            );
        }

        async ionViewWillEnter() {
            await this.loadTasabeeh();
            await this.loadOnEveryVisit();
        }

        async keyboardEv(ev: any) {
            ev.preventDefault();

            if (ev.keyCode === 77) {
                // m char key
                await menuController.toggle();
                return;
            }

            if (busy || (await menuController.isOpen().then((r) => r))) return;

            // handle r char button
            // will reset current
            if (ev.keyCode === 82) {
                this.resetSebha();
                return;
            } else if (ev.keyCode === 46) {
                // delete button
                this.remove();
                return;
            } else if (ev.keyCode === 78) {
                // n char key
                this.add();
                return;
            } else if (ev.keyCode === 84) {
                // t char key
                this.togglesebhaTheme();
                return;
            } else if (ev.keyCode === 67) {
                // c char key
                this.toggleColor();
                return;
            }
            this.onClick();
        }

        setBarColor() {
            // @ts-ignore
            const color = this.color === 'primary' ? this.theme : this.color;
            this.barColor =
                COLORES.find((x) => x.id === color)?.lighter ?? this.barColor;

            emitter.emit('color-updated', this.barColor);
        }

        addHardKeysEv(add = true) {
            this.onClick();
        }

        mounted() {
            this.bar = this.$refs.bar as Progress;

            // set backgroundImage
            Storage.get({ key: 'sebha_img' }).then((r) => {
                const node = document.createElement('style');
                node.innerHTML = `ion-content.sebha-con{--background: url('${r.value ??
                    DEFUALT_BG}')}`;
                (document.documentElement.querySelector(
                    '#sebhaPage'
                ) as HTMLDivElement).appendChild(node);
            });
            // set sebhaTheme
            Storage.get({ key: 'sebha_sebhaTheme' }).then(
                (r) => (this.sebhaTheme = r.value ?? this.sebhaTheme)
            );
            // set color
            Storage.get({ key: 'sebha_color' }).then((r) => {
                this.color = r.value ?? this.color;
                this.setBarColor();
            });
        }
    }
</script>
<style scoped>
    .wave {
        animation: wave 3s linear;
        animation-iteration-count: infinite;
        fill: var(--ion-color-primary, #3880ff);
    }
    .drop {
        fill: var(--ion-color-primary, #3880ff);
        /* xfill: #99000055; */
        animation: drop 3.2s linear infinite normal;
        /* stroke: var(--col-deepblue); */
        stroke-width: 0.5;
        transform: translateY(25px);
        transform-box: fill-box;
        transform-origin: 50% 100%;
    }
    .drop2 {
        animation-delay: 3s;
        animation-duration: 3s;
    }
    .drop3 {
        animation-delay: -2s;
        animation-duration: 3.4s;
    }
    .drop4 {
        animation-delay: 1.7s;
    }
    .drop5 {
        animation-delay: 2.7s;
        animation-duration: 3.1s;
    }
    .drop6 {
        animation-delay: -2.1s;
        animation-duration: 3.2s;
    }
    .gooeff {
        filter: url(#goo);
    }
    #wave2 {
        animation-duration: 5s;
        animation-direction: reverse;
        opacity: 0.6;
    }
    #wave3 {
        animation-duration: 7s;
        opacity: 0.3;
    }
    @keyframes drop {
        0% {
            transform: translateY(25px);
        }
        30% {
            transform: translateY(-10px) scale(0.1);
        }
        30.001% {
            transform: translateY(25px) scale(1);
        }
        70% {
            transform: translateY(25px);
        }
        100% {
            transform: translateY(-10px) scale(0.1);
        }
    }
    @keyframes wave {
        to {
            transform: translateX(-100%);
        }
    }

    @media only screen and (max-width: 768px) and (orientation: portrait) {
        .main {
            height: 100%;
            width: 100%;
        }
    }
</style>
