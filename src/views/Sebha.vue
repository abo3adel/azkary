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
                <ion-menu-button @click="setMenuItemWidth"></ion-menu-button>
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
                <ion-button
                    color="light"
                    @click="locked = !locked"
                    class="mx-auto"
                >
                    <ion-icon :icon="lockOpenOutline" v-if="!locked" />
                    <ion-icon :icon="lockClosedOutline" v-else />
                    <ion-label class="hidden sm:inline-block">
                        {{ $t('sebha.lock') }}
                    </ion-label>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-split-pane content-id="sebha-main-content" class="mt-14">
            <ion-content class="select-none" id="sebha-main-content">
                <div
                    class="flex h-full text-white bg-fixed bg-center bg-no-repeat bg-cover main"
                    @click.prevent="config.touch ? onClick() : null"
                >
                    <div class="flex w-full h-full bg-black bg-opacity-20">
                        <div
                            class="relative m-auto font-semibold"
                            v-show="theme === 'base'"
                        >
                            <div
                                id="progress-conatainer"
                                class="releative"
                            ></div>
                            <sebha-meta :sebha="sebha" />
                        </div>
                        <div
                            class="relative m-auto overflow-hidden border rounded-full w-80 h-80 border-primary-400"
                            v-show="theme === 'dev'"
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
                    horizontal="end"
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
                    horizontal="start"
                    slot="fixed"
                    @click.prevent="remove"
                    v-if="!locked"
                >
                    <ion-fab-button>
                        <ion-icon :icon="trashBinOutline" />
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
                    <div class="ion-padding">
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
                                class="w-full px-2 bg-primary-600 rounded-tr-md rounded-tl-md text-color"
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
                                <div
                                    class="absolute w-0 h-full transition-all duration-500 bg-primary-600"
                                    :style="
                                        `z-index: -1;width: ${(menuItemWidth /
                                            s.max) *
                                            s.current}px`
                                    "
                                ></div>
                            </div>
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
    } from 'ionicons/icons';
    // @ts-ignore
    import ProgressBar from 'progressbar.js/dist/progressbar';
    import { Plugins, Modals } from '@capacitor/core';

    import { Sebha } from '@/entities/Sebha';
    import db from '@/utils/db';
    import loader from '@/utils/loader';
    import { getConnection, getRepository } from 'typeorm';
    import toast from '@/utils/toast';
    import SebhaMeta from '@/components/SebhaMeta.vue';
    import { SebhaEntity, Sebha as ISebha } from '@/schema/SebhaEntity';
    import { UserEntity, User } from '@/schema/UserEntity';
    import { Vibration } from '@ionic-native/vibration';
    import sound from '../utils/sound';

    const { Storage } = Plugins;

    let busy = false;

    export const DEFUALT_BG = '/assets/img/ka3ba2.jpg';

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
        },
    })
    export default class SebhaView extends Vue {
        bar: any;
        tasabeeh: Sebha[] = [];
        active = 0;
        sebha: ISebha = new Sebha();
        theme = 'base';
        svgHeight = 0;
        color = 'primary';
        locked = false;
        menuItemWidth = 0;
        config = {
            autoNext: true,
            sound: false,
            vibration: true,
            hardKeys: false,
            touch: true,
            keyboard: true,
        };

        colorPaletteOutline = colorPaletteOutline;
        colorFillOutline = colorFillOutline;
        addOutline = addOutline;
        closeOutline = closeOutline;
        trashBinOutline = trashBinOutline;
        lockOpenOutline = lockOpenOutline;
        lockClosedOutline = lockClosedOutline;
        menuOutline = menuOutline;

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
        }

        async loadTasabeeh() {
            busy = true;
            await loader.show();
            this.tasabeeh = await (await db())
                .getRepository<Sebha>('sebha')
                .find();

            this.active = this.tasabeeh.length - 1;
            this.sebha = this.tasabeeh[this.active];

            this.bar?.set(this.sebha.current / this.sebha.max);
            this.svgHeight = this.calcHeight() * this.sebha.current;
            busy = false;

            // load config
            await this.loadConfig();

            await loader.hide();
        }

        async loadConfig() {
            const res = (
                await (await db())
                    .createQueryBuilder(UserEntity, 'user_set')
                    .select(
                        'sebhaAutoNext, sound, vibration, hardKeys, touch, keyboard'
                    )
                    .execute()
            )[0] as User;

            // TODO check for platform first
            this.config.autoNext = res.sebhaAutoNext;
            this.config.sound = res.sound;
            this.config.vibration = res.vibration;
            this.config.hardKeys = res.hardKeys;
            this.config.touch = res.touch;
            this.config.keyboard = res.keyboard;

            console.log(res);

            if (this.config.sound) {
                await sound.addFile(
                    '/assets/sound/zapsplat_click.mp3',
                    'click'
                );
            }

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
        }

        setMenuItemWidth() {
            this.menuItemWidth = 0;
            const el = document.querySelector(
                '.card-body.p-2'
            ) as HTMLDivElement;

            setTimeout(() => (this.menuItemWidth = el.offsetWidth), 500);
        }

        /**
         * calculate dev theme progress-conatainer div height
         * ?eight is mesured by rem, div max-height -> 20rem
         * ?calculate with 19 to show animation event on last number
         *
         * @returns number
         */
        calcHeight(): number {
            return 17 / this.sebha.max;
        }

        async onClick() {
            // vibrate on click
            if (this.config.vibration) Vibration.vibrate(300);

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
                this.updateProgress();
                // will be incremented below
                // then set after increment to zero
                this.svgHeight = -this.calcHeight();
            }

            this.bar?.animate(this.sebha.current / this.sebha.max);

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
        async toggleTheme() {
            this.theme = this.theme === 'dev' ? 'base' : 'dev';

            if (this.theme === 'base') {
                if (!this.bar) this.setSebhaProgress();

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
            busy = true;
            const alert = await alertController.create({
                cssClass: 'ion-alert',
                header: this.$t('sebha.add.header'),
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
                                toast(this.$t('sebha.err.noBody'));
                                return;
                            }

                            await loader.show();

                            let sebha = new Sebha();
                            sebha.body = ev.body;
                            sebha.max = ev.max;

                            sebha = await (await db())
                                .getRepository(SebhaEntity)
                                .save(sebha);

                            // select it as current active sebha
                            this.tasabeeh.push(sebha);
                            this.active = this.tasabeeh.length - 1;
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
                title: this.$t('sebha.del.conf'),
                message: this.$t('sebha.del.mess'),
                okButtonTitle: this.$t('sebha.del.okBtn'),
                cancelButtonTitle: this.$t('sebha.del.cancelBtn'),
            });

            if (!confirm.value) {
                busy = false;
                return;
            }

            await loader.show();

            await getRepository(SebhaEntity).delete({ id: this.sebha.id });

            this.tasabeeh.splice(this.active, 1);
            this.sebha.current = 0;
            this.updateProgress();
            this.active = this.tasabeeh[this.tasabeeh.length - 1]
                ? this.tasabeeh.length - 1
                : 0;

            // check if list has any more sebha items
            if (this.active) {
                // assign to last item in list
                this.sebha = this.tasabeeh[this.active - 1];
            } else {
                // create new sebha with default values
                const sebha = new Sebha();
                sebha.body = this.$t('sebha.add.pl');
                sebha.max = 100;
                this.sebha = await getRepository(SebhaEntity).save(sebha);
            }

            this.updateProgress();

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
            this.updateProgress();
            await loader.hide();
        }

        updateProgress() {
            this.svgHeight = this.calcHeight() * this.sebha.current;
            this.bar?.animate(this.sebha.current / this.sebha.max, {
                duration: 500,
            });
        }

        /**
         * iniate progress bar
         */
        setSebhaProgress() {
            this.bar = new ProgressBar.Circle(
                document.querySelector('#progress-conatainer'),
                {
                    color: 'var(--ion-color-primary)',
                    strokeWidth: 4,
                    trailWidth: 1,
                    easing: 'easeInOut',
                    trailColor: 'var(--ion-color-primary)',
                    duration: 600,
                    from: { color: '#e91e63', width: 2 },
                    to: { color: '#23c92a', width: 5 },
                    step: (state: any, circle: any) => {
                        circle.path.setAttribute('stroke', state.color);
                        circle.path.setAttribute('stroke-width', state.width);
                        circle.setText('');
                        // const value = Math.round(
                        //     circle.value() * this.sebha.max ?? 10
                        // );
                        // const parent = document.querySelector(
                        //     '.progressbar-text'
                        // );
                        // if (!parent) {
                        //     circle.setText('');
                        // }
                        // let header = parent?.querySelector(
                        //     '#body'
                        // ) as HTMLDivElement;
                        // let percent = parent?.querySelector(
                        //     '#percent'
                        // ) as HTMLDivElement;

                        // if (!header) {
                        //     header = document.createElement('div');
                        //     header.id = 'body';
                        //     parent?.appendChild(header);
                        // }
                        // if (!percent) {
                        //     percent = document.createElement('div');
                        //     percent.id = 'percent';
                        //     parent?.appendChild(percent);
                        // }

                        // if (value === 0 || !this.sebha.max) {
                        //     // circle.setText('');
                        // } else {
                        //     header.textContent = this.sebha.body;
                        //     percent.textContent = `${value}/${this.sebha.max ??
                        //         10}`;
                        // }
                    },
                }
            );
            this.bar.text.style.fontSize = 'inherit'; // control with tailwind
        }

        ionViewWillLeave() {
            document.removeEventListener('keyup', this.keyboardEv);
        }

        ionViewWillEnter() {
            this.loadOnEveryVisit();
        }

        async keyboardEv(ev: any) {
            ev.preventDefault();

            if (ev.keyCode === 77) {
                // m char key
                await menuController.toggle();
                return;
            }

            if (busy || (await menuController.isOpen().then((r) => r))) return;

            // handle esc buttton
            // will reset current
            if (ev.keyCode === 27) {
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
                this.toggleTheme();
                return;
            } else if (ev.keyCode === 67) {
                // c char key
                this.toggleColor();
                return;
            }
            this.onClick();
        }

        mounted() {
            if (this.theme !== 'dev') {
                this.setSebhaProgress();
            }
            this.loadTasabeeh();

            // listen for volume keys
            window.addEventListener('volumebuttonslistener', () => {
                // TODO test this on real device
                this.onClick();
            });

            // set backgroundImage
            Storage.get({ key: 'sebha_img' }).then((r) => {
                const node = document.createElement('style');
                node.innerHTML = `.main{background-image: url('${r.value ??
                    DEFUALT_BG}')}`;
                document.documentElement.appendChild(node);
            });
            // set theme
            Storage.get({ key: 'sebha_theme' }).then(
                (r) => (this.theme = r.value ?? this.theme)
            );
            // set color
            Storage.get({ key: 'sebha_color' }).then(
                (r) => (this.color = r.value ?? this.color)
            );
        }
    }
</script>
<style scoped>
    .wave {
        animation: wave 3s linear;
        animation-iteration-count: infinite;
        fill: var(--ion-color-primary);
    }
    .drop {
        fill: var(--ion-color-primary);
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
</style>
