<template>
    <ion-page>
        <ion-header>
            <ion-toolbar :color="meta.color || 'primary'" class="haveBg">
                <ion-buttons slot="start">
                    <ion-button color="light" @click="goBack()">
                        <ion-icon
                            slot="icon-only"
                            :icon="arrowBackOutline"
                            class="rtl:transform rtl:rotate-180"
                        ></ion-icon>
                    </ion-button>
                </ion-buttons>
                <h3 class="px-4 uppercase">
                    {{ $t(`zikr.cat.${meta.slug}`) }}
                </h3>
                <ion-icon
                    v-if="meta.type === 'svg'"
                    :src="`/assets/icons/${meta.name}.svg`"
                    class="absolute text-5xl top-1"
                    :style="lang === 'ar' ? 'left: 0' : 'right: 0'"
                ></ion-icon>
                <ion-icon
                    v-else
                    :icon="meta.name"
                    class="absolute text-5xl top-1"
                    :style="lang === 'ar' ? 'left: 0' : 'right: 0'"
                ></ion-icon>
            </ion-toolbar>
            <ion-toolbar color="light">
                <ion-buttons slot="start">
                    <ion-button
                        :color="
                            theme.indexOf('colored') > -1
                                ? meta.color
                                : 'primary'
                        "
                        @click="toggleReorder()"
                        v-if="theme.indexOf('slide') < 0"
                    >
                        <ion-icon slot="start" :icon="reorderFourOutline" />
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.reorder') }}
                        </span>
                    </ion-button>
                    <ion-button
                        :color="
                            theme.indexOf('colored') > -1
                                ? meta.color
                                : 'primary'
                        "
                        @click="add()"
                    >
                        <ion-icon :icon="addOutline" slot="start" />
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.addt') }}
                        </span>
                    </ion-button>
                    <ion-button
                        :color="
                            theme.indexOf('colored') > -1
                                ? meta.color
                                : 'primary'
                        "
                        @click="themeToggle()"
                    >
                        <ion-icon :icon="colorPaletteOutline" slot="start" />
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.brush') }}
                        </span>
                    </ion-button>
                    <ion-button
                        :color="
                            theme.indexOf('colored') > -1
                                ? meta.color
                                : 'primary'
                        "
                        @click="fontIncrese()"
                    >
                        <ion-label class="text-lg">
                            {{ $t('zikr.show.font') }}+
                        </ion-label>
                    </ion-button>
                    <ion-button
                        :color="
                            theme.indexOf('colored') > -1
                                ? meta.color
                                : 'primary'
                        "
                        @click="fontDecrese()"
                    >
                        <ion-label class="text-xs">
                            {{ $t('zikr.show.font') }}-
                        </ion-label>
                    </ion-button>
                    <ion-button
                        :color="
                            theme.indexOf('colored') > -1
                                ? meta.color
                                : 'primary'
                        "
                        @click.prevent="slideCog()"
                        v-if="theme.indexOf('slide') > -1"
                    >
                        <ion-icon :icon="cogOutline" slot="start" />
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.slideCog') }}
                        </span>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content
            :fullscreen="true"
            :style="
                `font-family: '${azkarFont}', 'AmiriQuranColored';
                ${
                    azkarFont.indexOf('AmiriQuran') > -1
                        ? '    line-height: 2.8rem'
                        : ''
                };
                --ion-azkar-font: '${azkarFont}', 'AmiriQuranColored';`
            "
        >
            <ion-reorder-group
                @ionItemReorder="doReorder($event)"
                :disabled="!reorder"
                class="font-size-updater"
                :style="`font-size: ${fontSize}rem`"
                v-if="['base', 'dev', 'dev-colored'].indexOf(theme) > -1"
            >
                <template v-for="(z, zinx) in category.azkar" :key="z.id">
                    <transition name="slide-fade" v-if="theme === 'base'">
                        <base-theme
                            :z="z"
                            :zinx="zinx"
                            :color="meta.color"
                            @add-to-sebha="addToSebha($event.zikr)"
                            @edit="
                                add(
                                    $event.zikr.body,
                                    $event.zikr.count,
                                    $event.zikr.id
                                )
                            "
                            @share="shareIt($event.body)"
                            @remove="remove($event.id)"
                            @decree="onDecree(z.count, z.id)"
                        >
                            <template #order>
                                <ion-reorder v-if="reorder"></ion-reorder>
                            </template>
                        </base-theme>
                    </transition>
                    <transition
                        name="slide-fade"
                        v-if="theme === 'dev' || theme === 'dev-colored'"
                    >
                        <dev-theme
                            :z="z"
                            :theme="theme"
                            :color="meta.color"
                            @decree="onDecree(z.count, z.id)"
                            @opts="runOpts($event)"
                        >
                            <template #order>
                                <ion-reorder
                                    class="absolute top-0 left-0 z-10"
                                    v-if="reorder"
                                ></ion-reorder>
                            </template>
                        </dev-theme>
                    </transition>
                </template>
            </ion-reorder-group>
            <div
                v-if="theme === 'slide' || theme === 'slide-colored'"
                class="h-full font-size-updater"
                :style="`font-size: ${fontSize}rem`"
            >
                <slide-theme
                    :azkar="category.azkar"
                    :azkar-clone="azkarClone"
                    :color="meta.color"
                    :theme="theme"
                    :keyboard="config.keyboard"
                    @decree="
                        onDecree($event.count, $event.id, $event.open, true)
                    "
                    @opts="runOpts($event.zikr)"
                />
            </div>
            <ion-fab
                vertical="bottom"
                horizontal="start"
                slot="fixed"
                v-if="reorder"
                @click="saveOrder()"
            >
                <ion-fab-button>
                    <ion-icon :icon="checkmarkDoneOutline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
        <ion-action-sheet
            :is-open="sheet.show"
            css-class="opr-actions"
            :backdrop-dismiss="true"
            :buttons="sheet.buttons"
            @onDidDismiss="sheet.show = false"
        >
        </ion-action-sheet>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue, prop } from 'vue-class-component';

    import {
        IonPage,
        IonBackButton,
        IonToolbar,
        IonHeader,
        IonContent,
        IonLabel,
        IonReorderGroup,
        IonReorder,
        IonIcon,
        IonButtons,
        IonButton,
        IonFabButton,
        IonActionSheet,
        IonFab,
        alertController,
        modalController,
        IonSlides,
    } from '@ionic/vue';
    import { AlertInput } from '@ionic/core/dist/types/components/alert/alert-interface';
    import { Category } from '@/entities/Category';
    import db from '@/utils/db';
    import getCategoryIcon, { CategoryIcon } from '@/utils/getCategoryIcon';
    import {
        addOutline,
        colorPaletteOutline,
        reorderFourOutline,
        checkmarkDoneOutline,
        arrowBackOutline,
        cogOutline,
        createOutline,
        trashBinOutline,
        shareSocialOutline,
        closeOutline,
        sendOutline,
    } from 'ionicons/icons';
    import toast from '@/utils/toast';
    import { Zikr } from '@/entities/Zikr';
    import { getRepository, getConnection } from 'typeorm';
    import loader from '@/utils/loader';
    import ZikrStats from '@/modals/ZikrStats.vue';
    import { Plugins } from '@capacitor/core';
    import { UserTheme } from '@/entities/User';
    // @ts-ignore
    import emitter from 'tiny-emitter/instance';

    import DevTheme from '@/components/themes/Dev.vue';

    import { defineAsyncComponent } from 'vue';
    import Loading from '@/components/Loading.vue';
    import { CategoryEntity, CategoryType } from '@/schema/CategoryEntity';
    import { ZikrEntity } from '@/schema/ZikrEntity';
    import { Controls, loadConfigrations } from '@/common/ControlConfig';
    import { Vibration } from '@ionic-native/vibration';
    import { Fonts } from '@/schema/UserEntity';
    import share from '@/utils/share';
    import { Sebha, SebhaEntity } from '@/schema/SebhaEntity';
    import { Du3aEntity } from '@/schema/Du3aEntity';
    import confirmAppExit from '@/utils/confirmAppExit';

    const { Modals, Storage } = Plugins;

    let busyShow = false;

    const BaseTheme = defineAsyncComponent({
        loader: () => import('@/components/themes/Base.vue'),
        loadingComponent: Loading,
    });
    const SlideTheme = defineAsyncComponent({
        loader: () => import('@/components/themes/Slide.vue'),
        loadingComponent: Loading,
    });

    class Props {
        type = prop<string>({ default: CategoryType.Zikr });
    }

    @Options({
        components: {
            BaseTheme,
            DevTheme,
            SlideTheme,
            Loading,
            IonPage,
            IonBackButton,
            IonToolbar,
            IonHeader,
            IonContent,
            IonLabel,
            IonReorderGroup,
            IonReorder,
            IonIcon,
            IonButtons,
            IonButton,
            IonFabButton,
            IonActionSheet,
            IonFab,
            IonSlides,
        },
        inject: ['lang'],
    })
    export default class Show extends Vue.with(Props) {
        category: Category = new Category();
        meta: CategoryIcon | null = null;
        reorder = false;
        oldOrder: Zikr[] = [];
        // will hold basic (initial) count for this item
        azkarClone: { id: number; count: number }[] = [];
        theme: UserTheme | string = UserTheme.SlideColored;
        fontSize = 1.1;
        totalCount = 0;
        readed = 0;
        modal!: HTMLIonModalElement;
        config = Controls;
        azkarFont: string = Fonts.Amiri;
        sheet = {
            show: false,
            zikr: new Zikr(),
            buttons: [],
        };

        addOutline = addOutline;
        colorPaletteOutline = colorPaletteOutline;
        reorderFourOutline = reorderFourOutline;
        checkmarkDoneOutline = checkmarkDoneOutline;
        arrowBackOutline = arrowBackOutline;
        cogOutline = cogOutline;

        /**
         * load all azkar related to this category
         */
        async loadData() {
            await loader.show();

            // @ts-ignore
            this.category = await (await db())
                .createQueryBuilder(CategoryEntity, 'categories')
                .leftJoinAndSelect(
                    `categories.${
                        this.type === CategoryType.Zikr ? 'azkar' : 'ad3ia'
                    }`,
                    'items'
                )
                .where({ slug: this.meta?.slug })
                .orderBy('items.order', 'ASC')
                .addOrderBy('items.id', 'DESC')
                .getOneOrFail();

            if (this.type === CategoryType.Du3a) {
                // Hack solution
                // @ts-ignore
                this.category.azkar = this.category.ad3ia.map((x) => {
                    // @ts-ignore
                    x.count = 1;
                    return x;
                });
            }

            this.afterDataUpdate();

            await this.loadConfig();
            emitter.emit('config');

            await loader.hide();
        }

        async loadConfig() {
            const res = await loadConfigrations(this, ', azkarFont');
            this.azkarFont = res.azkarFont;

            if (this.config.keyboard) {
                document.addEventListener('keyup', this.keyboardEvents);
            } else {
                document.removeEventListener('keyup', this.keyboardEvents);
            }
        }

        async keyboardEvents(ev: any) {
            ev.preventDefault();
            const kc = ev.keyCode;
            // console.log(kc);

            if (busyShow) return;

            if (kc === 78) {
                // n char key
                this.add();
                return;
            } else if (kc === 84) {
                // t char key
                this.themeToggle();
                return;
            } else if (kc === 187) {
                // + or = symbol button
                this.fontIncrese();
                return;
            } else if (kc === 189) {
                // _ or - symbol buttn
                this.fontDecrese();
                return;
            } else if (ev.keyCode === 32) {
                // space button

                emitter.emit('space-clicked');
            }
        }

        afterDataUpdate(): void {
            this.azkarClone.splice(0);

            this.totalCount = this.category.azkar.reduce(
                (p, c) => (p += c.count),
                0
            );

            this.category.azkar.forEach((x) =>
                this.azkarClone.push({ count: x.count, id: x.id })
            );
        }

        /**
         * add new zikr to this category
         *
         * @param txt string zikr body
         * @param count number zikr count
         * @param id number|null pass this to edit and update
         *
         * @returns Promise<void>
         */
        async add(
            txt = '',
            count = 1,
            id: number | null = null
        ): Promise<void> {
            busyShow = true;

            if (id) {
                count = this.azkarClone.find((x) => x.id === id)?.count ?? 1;
            }

            const inputs: AlertInput[] = [
                {
                    name: 'body',
                    type: 'textarea',
                    placeholder: 'سبحان الله وبحمده',
                    value: txt,
                    attributes: {
                        dir: 'rtl',
                    },
                },
                {
                    name: 'count',
                    type: 'number',
                    min: 1,
                    placeholder: this.$t('zikr.add.countPH'),
                    value: count,
                    attributes: {
                        inputmode: 'numeric',
                    },
                },
            ];

            if (this.type === CategoryType.Du3a) {
                inputs.splice(1);
            }

            const alert = await alertController.create({
                cssClass: 'ion-alert',
                header: this.$t('zikr.add.header'),
                inputs,
                buttons: [
                    {
                        text: this.$t('zikr.add.cancel'),
                        role: 'cancel',
                        cssClass: 'cancelBtn',
                        handler: () => {
                            busyShow = false;
                        },
                    },
                    {
                        text: this.$t('zikr.add.save'),
                        cssClass: 'submitBtn',
                        handler: async (ev): Promise<void> => {
                            const body = ev.body as string;
                            const count = ev.count as number;
                            if (!body || !body.length) {
                                toast(this.$t('zikr.err.noBody'));
                                busyShow = false;
                                return;
                            }

                            await loader.show();

                            let zikr = new Zikr();
                            zikr.body = body.trim();
                            zikr.count = count > 0 ? count : 1;
                            if (id) {
                                zikr.id = id;
                            } else {
                                zikr.order = this.category.azkar.length;
                                // set category relationship
                                zikr.category = this.category;
                            }

                            zikr = await getRepository(this.type).save(zikr);

                            // add to current list without
                            // relationship object
                            delete zikr.category;

                            if (id) {
                                // update item
                                this.category.azkar = this.category.azkar.map(
                                    (x) => {
                                        if (x.id === id) {
                                            x.body = body;
                                            x.count = count ?? 1;
                                        }

                                        return x;
                                    }
                                );
                            } else {
                                this.category.azkar.push(zikr);
                            }

                            this.afterDataUpdate();

                            busyShow = false;

                            return await loader.hide();
                        },
                    },
                ],
            });

            await alert.present();
        }

        /**
         * add this zikr item to tasabeeh
         */
        async addToSebha(zikr: Zikr) {
            zikr =
                (await getRepository<Zikr>(this.type).findOne(
                    { id: zikr.id },
                    { select: ['body', 'count', 'id'] }
                )) ?? zikr;

            const done = await getConnection()
                .createQueryBuilder<Sebha>(SebhaEntity, 'tasabeeh_ins')
                .insert()
                .values({
                    body: zikr.body,
                    max: zikr?.count ?? 1,
                })
                .execute();

            if (done.identifiers[0].id) {
                toast(this.$t('zikr.sebhaDone'));
            }
        }

        async themeToggle() {
            const themes = [
                'dev-colored',
                'dev',
                'base',
                'slide-colored',
                'slide',
            ];
            const inx = themes.indexOf(this.theme) + 1;
            if (inx >= themes.length) {
                this.theme = themes[0];
            } else {
                this.theme = themes[inx];
            }

            await Storage.set({ key: `${this.type}Theme`, value: this.theme });
        }

        /**
         * delete zikr from database
         * @returns Promise<void>
         */
        async remove(id: number): Promise<void> {
            const confirm = await Modals.confirm({
                title: this.$t('zikr.del.conf'),
                message: this.$t('zikr.del.mess'),
                okButtonTitle: this.$t('zikr.del.okBtn'),
                cancelButtonTitle: this.$t('zikr.del.cancelBtn'),
            });

            if (!confirm.value) return;

            await loader.show();

            await getRepository(this.type).delete({ id });

            const inx = this.category.azkar.findIndex((x) => x.id === id);

            this.category.azkar[inx].count = 0;

            setTimeout(
                () => {
                    this.category.azkar.splice(inx, 1);
                    this.afterDataUpdate();
                    emitter.emit('deleted');
                },
                this.theme.indexOf('slide') > -1 ? 0 : 500
            );

            await loader.hide();
            return;
        }

        /**
         * share zikr item
         */
        async shareIt(text: string) {
            await share(this, text, this.$t('zikr.share.dtitle'));
        }

        /**
         * toggle reorder option
         */
        toggleReorder(): void {
            // pass array with value not reference
            // aka clone
            this.oldOrder = [...this.category.azkar];

            this.reorder = !this.reorder;
        }

        /**
         * fire reorder event to complete
         */
        doReorder(event: CustomEvent) {
            event.detail.complete(this.category.azkar);
        }

        /**
         * save the ordered list by index
         * @returns Promise<void>
         */
        async saveOrder(): Promise<void> {
            // check if menu order was changed
            const changed = this.category.azkar.find(
                (x, inx) => x.id !== this.oldOrder[inx].id
            );
            if (!changed) {
                toast(this.$t('zikr.err.noOrder'));
                return;
            }
            await loader.show();

            const sql =
                this.type === CategoryType.Zikr
                    ? getConnection().createQueryBuilder(ZikrEntity, 'items')
                    : getConnection().createQueryBuilder(Du3aEntity, 'items');

            let y = 1;
            for (const x of this.category.azkar) {
                await sql
                    .update()
                    // set order to current list index
                    // because reorder only affects list index
                    .set({ order: y })
                    .where({ id: x.id }) // typeorm is awesome
                    .execute();
                y++;
            }

            await loader.hide();

            // disable reorder
            this.reorder = false;
            return;
        }

        /**
         * increse ion-label font size from 0.9rem to 1.9rem
         *
         * @returns void
         */
        fontIncrese(): void {
            if (this.fontSize >= 1.9) {
                toast(this.$t('zikr.err.font-increse'));
                return;
            }

            this.fontSize += 0.1;
            Storage.set({
                key: `${this.type}FontSize`,
                value: `${this.fontSize}`,
            });
        }

        /**
         * decrese ion-label font size from 1.9rem to 0.9rem
         *
         * @returns void
         */
        fontDecrese(): void {
            if (this.fontSize <= 0.9) {
                toast(this.$t('zikr.err.font-decrese'));
                return;
            }

            this.fontSize -= 0.1;
            Storage.set({
                key: `${this.type}FontSize`,
                value: `${this.fontSize}`,
            });
        }

        async onDecree(
            count: number,
            id: number,
            openDirect = false,
            slide = false
        ) {
            // disable if reorder is enabled
            if (this.reorder) {
                const inx = this.category.azkar.findIndex((x) => x.id === id);

                this.category.azkar[inx].count++;
                return;
            }

            if (this.config.vibration) {
                Vibration.vibrate(30);
            }

            this.readed++;

            if (count === 0 && !slide) {
                // remove item and trigger animation
                const inx = this.category.azkar.findIndex((x) => x.id === id);

                this.category.azkar[inx].count = 0;

                setTimeout(() => this.category.azkar.splice(inx, 1), 500);
            }

            if (this.category.azkar.length > 1 && !openDirect) {
                return;
            }

            if (this.type === CategoryType.Du3a) {
                this.$router.replace(`/tabs/${this.type}`);
                return;
            }

            this.modal = await modalController.create({
                component: ZikrStats,
                backdropDismiss: false,
                keyboardClose: false,
                componentProps: {
                    title: this.category.title,
                    meta: this.meta,
                    count: openDirect ? --this.readed : this.totalCount,
                },
            });
            return await this.modal.present();
        }

        async goBack() {
            if (!this.readed) {
                await this.$router.replace(`/tabs/${this.type}`);
                return;
            }

            await this.onDecree(1, 0, true);
        }

        slideCog() {
            emitter.emit('slide-cog');
        }

        runOpts(zikr: Zikr) {
            this.sheet.zikr = zikr;
            this.sheet.show = true;
        }

        getButtons() {
            return [
                {
                    text: this.$t('show.item.addSebha'),
                    icon: sendOutline,
                    cssClass: 'addSebhaBtn',
                    handler: async () => {
                        await this.addToSebha(this.sheet.zikr);
                    },
                },
                {
                    text: this.$t('show.item.edit'),
                    icon: createOutline,
                    cssClass: 'editBtn',
                    handler: async () => {
                        await this.add(
                            this.sheet.zikr.body,
                            this.sheet.zikr.count,
                            this.sheet.zikr.id
                        );
                    },
                },
                {
                    text: this.$t('show.item.share'),
                    icon: shareSocialOutline,
                    cssClass: 'shareBtn',
                    handler: async () => {
                        await this.shareIt(this.sheet.zikr.body);
                    },
                },
                {
                    text: this.$t('show.item.del'),
                    icon: trashBinOutline,
                    cssClass: 'deleteBtn',
                    handler: async () => {
                        await this.remove(this.sheet.zikr.id);
                    },
                },
                {
                    text: this.$t('show.close'),
                    icon: closeOutline,
                    role: 'cancel',
                    cssClass: 'cancelBtn',
                },
            ];
        }

        backButtonEv(ev: any) {
            ev.detail.register(8, async () => {
                if (this.$route.path.indexOf('/tabs/') > -1) {
                    await confirmAppExit(this);
                    return;
                }

                if (this.modal?.isConnected) {
                    await this.$router.replace(`/tabs/${this.type}`);
                    await this.modal?.dismiss();
                    return;
                }
                await this.goBack();
            });
        }

        ionViewWillEnter() {
            this.loadData();

            if (this.config.keyboard) {
                document.addEventListener('keyup', this.keyboardEvents);
            } else {
                document.removeEventListener('keyup', this.keyboardEvents);
            }

            document.addEventListener('ionBackButton', this.backButtonEv);
        }

        ionViewWillLeave() {
            document.removeEventListener('keyup', this.keyboardEvents);

            document.removeEventListener('ionBackButton', this.backButtonEv);
        }

        beforeMount() {
            this.meta = getCategoryIcon().filter(
                (x) => x.slug === (this.$route.params.slug as string)
            )[0];

            Storage.get({ key: `${this.type}Theme` }).then(
                (res) => (this.theme = res.value ?? this.theme)
            );

            // set font size
            Storage.get({ key: `${this.type}FontSize` }).then(
                (res) =>
                    (this.fontSize = parseFloat(
                        res.value ?? `${this.fontSize}`
                    ))
            );
        }

        async mounted() {
            await emitter.on('go-home', async () => {
                await this.$router.replace(`/tabs/${this.type}`);
                await this.modal?.dismiss();
            });

            // @ts-ignore
            this.sheet.buttons = this.getButtons();
        }
    }
</script>
<style lang="postcss">
    ion-item.item {
        font-size: inherit;
    }
    .slide-fade-enter-active {
        transition: all 0.2s ease-out;
    }
    .slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(50px);
        opacity: 0;
    }
</style>
