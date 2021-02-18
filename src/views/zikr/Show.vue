<template>
    <ion-page>
        <ion-header>
            <ion-toolbar :color="meta.color || 'primary'" class="haveBg">
                <ion-buttons slot="start">
                    <ion-button color="light" @click="goBack()">
                        <ion-icon
                            slot="icon-only"
                            :icon="arrowBackOutline"
                        ></ion-icon>
                    </ion-button>
                </ion-buttons>
                <h3 class="px-4 uppercase">
                    {{ $t(`zikr.cat.${meta.slug}`) }}
                </h3>
                <ion-icon
                    v-if="meta.type === 'svg'"
                    :src="`/assets/icons/${meta.name}.svg`"
                    class="absolute right-0 text-5xl top-2"
                ></ion-icon>
                <ion-icon
                    v-else
                    :icon="meta.name"
                    class="absolute right-0 text-5xl top-2"
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
                    >
                        <ion-icon :icon="reorderFourOutline"></ion-icon>
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
                        <ion-icon :icon="addOutline"></ion-icon>
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.add') }}
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
                        <ion-icon :icon="colorPaletteOutline"></ion-icon>
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
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
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
                            @edit="
                                add(
                                    $event.zikr.body,
                                    $event.zikr.count,
                                    $event.zikr.id
                                )
                            "
                            @share="share($event.body)"
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
                            @edit="
                                add(
                                    $event.zikr.body,
                                    $event.zikr.count,
                                    $event.zikr.id
                                )
                            "
                            @share="share($event.body)"
                            @remove="remove($event.id)"
                            @decree="onDecree(z.count, z.id)"
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
                    :color="meta.color"
                    :theme="theme"
                    @edit="
                        add($event.zikr.body, $event.zikr.count, $event.zikr.id)
                    "
                    @share="share($event.body)"
                    @remove="remove($event.id)"
                    @decree="
                        onDecree($event.count, $event.id, $event.open, true)
                    "
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
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';

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
        IonFab,
        alertController,
        modalController,
        IonSlides,
    } from '@ionic/vue';
    import { Category } from '@/entities/Category';
    import db from '@/utils/db';
    import getCategoryIcon, { CategoryIcon } from '@/utils/getCategoryIcon';
    import {
        addOutline,
        colorPaletteOutline,
        reorderFourOutline,
        checkmarkDoneOutline,
        arrowBackOutline,
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
    import SlideTheme from '@/components/themes/Slide.vue';

    import { defineAsyncComponent } from 'vue';
    import Loading from '@/components/Loading.vue';

    const { Modals, Share, Clipboard, Storage } = Plugins;

    const BaseTheme = defineAsyncComponent({
        loader: () => import('@/components/themes/Base.vue'),
        loadingComponent: Loading,
    });

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
            IonFab,
            IonSlides,
        },
    })
    export default class Show extends Vue {
        category: Category = new Category();
        meta: CategoryIcon | null = null;

        addOutline = addOutline;
        colorPaletteOutline = colorPaletteOutline;
        reorderFourOutline = reorderFourOutline;
        checkmarkDoneOutline = checkmarkDoneOutline;
        arrowBackOutline = arrowBackOutline;

        reorder = false;
        oldOrder: Zikr[] = [];
        loaderTxt = '';
        theme: UserTheme | string = UserTheme.DevColored;
        fontSize = 1.1;
        totalCount = 0;
        readed = 0;
        modal!: HTMLIonModalElement;

        /**
         * load all azkar related to this category
         */
        async loadData() {
            await loader.show(this.loaderTxt);

            this.category = await (await db())
                .createQueryBuilder(Category, 'categories')
                .leftJoinAndSelect('categories.azkar', 'azkar')
                .where({ slug: this.meta?.slug })
                .orderBy('azkar.order', 'ASC')
                .addOrderBy('azkar.id', 'DESC')
                .getOneOrFail();

            await loader.hide();

            this.totalCount = this.category.azkar.reduce(
                (p, c) => (p += c.count),
                0
            );

            emitter.emit('data-loaded');
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
            const alert = await alertController.create({
                cssClass: 'ion-alert',
                header: this.$t('zikr.add.header'),
                inputs: [
                    {
                        name: 'body',
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
                        handler: async (ev): Promise<void> => {
                            const body = ev.body as string;
                            const count = ev.count as number;
                            if (!body || !body.length) {
                                toast(this.$t('zikr.err.noBody'));
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

                            zikr = await getRepository(Zikr).save(zikr);

                            // add to current list without
                            // relationship object
                            delete zikr.category;

                            if (id) {
                                // update item
                                this.category.azkar = this.category.azkar.map(
                                    (x) => {
                                        if (x.id === id) {
                                            x.body = body;
                                            x.count = count;
                                        }

                                        return x;
                                    }
                                );
                            } else {
                                this.category.azkar.push(zikr);
                            }

                            return await loader.hide();
                        },
                    },
                ],
            });

            alert.present();
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

            await Storage.set({ key: 'theme', value: this.theme });
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

            await getRepository(Zikr).delete({ id });

            const inx = this.category.azkar.findIndex((x) => x.id === id);

            this.category.azkar[inx].count = 0;

            setTimeout(() => {
                this.category.azkar.splice(inx, 1);
                this.totalCount = this.category.azkar.reduce(
                    (p, c) => (p += c.count),
                    0
                );
            }, 500);

            await loader.hide();
            return;
        }

        /**
         * share zikr item
         */
        async share(text: string) {
            // TODO test in native app
            try {
                await Share.share({
                    title: this.$t('zikr.share.dtitle'),
                    text: text,
                    url: '',
                    dialogTitle: this.$t('zikr.share.dtitle'),
                });
            } catch (e) {
                await Clipboard.write({
                    string: text,
                });
                toast(this.$t('copied.done'));
            }
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
                toast(this.$t('zikr.err.noOrdered'));
                return;
            }
            await loader.show(this.loaderTxt);

            let y = 0;
            for (const x of this.category.azkar) {
                await getConnection()
                    .createQueryBuilder(Zikr, 'azkar')
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
            Storage.set({ key: 'fontSize', value: `${this.fontSize}` });
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
            Storage.set({ key: 'fontSize', value: `${this.fontSize}` });
        }

        async onDecree(
            count: number,
            id: number,
            openDirect = false,
            slide = false
        ) {
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
                await this.$router.replace('/tabs/zikr');
                return;
            }

            await this.onDecree(1, 0, true);
        }

        beforeMount() {
            this.meta = getCategoryIcon().filter(
                (x) => x.slug === (this.$route.params.slug as string)
            )[0];

            Storage.get({ key: 'theme' }).then(
                (res) => (this.theme = res.value as string)
            );

            // set font size
            Storage.get({ key: 'fontSize' }).then(
                (res) => (this.fontSize = parseFloat(res.value as string))
            );
        }

        mounted() {
            this.loaderTxt = this.$t('loderTxt');
            this.loadData();
            emitter.on('go-home', async () => {
                await this.$router.replace('/tabs/zikr');
                await this.modal?.dismiss();
            });
        }
    }
</script>
<style lang="postcss">
    ion-item.item {
        font-size: inherit;
    }
    .ion-loader {
        --background: var(--ion-color-primary);
        --spinner-color: var(--ion-color-primary-contrast);

        color: var(--ion-color-primary-contrast);
    }
    /* .ion-alert .alert-wrapper {
        --background: #e5e5e5;
    } */
    .ion-alert {
        .cancelBtn {
            @apply text-orange-600 transition duration-300;
            &:hover,
            &:focus,
            &:active {
                @apply bg-orange-600 text-white;
            }
        }
        .submitBtn {
            @apply transition duration-300 font-semibold;
            color: var(--ion-color-primary);
            &:hover,
            &:focus,
            &:active {
                background: var(--ion-color-primary);
                color: var(--ion-color-primary-contrast);
            }
        }
    }
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }
    .slide-fade-leave-active {
        transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(50px);
        opacity: 0;
    }
</style>
