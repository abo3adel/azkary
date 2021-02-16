<template>
    <ion-page>
        <ion-header>
            <ion-toolbar :color="meta.color || 'primary'">
                <ion-buttons slot="start">
                    <ion-back-button
                        default-href="/tabs/home"
                    ></ion-back-button>
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
                    <ion-button color="primary" @click="toggleReorder()">
                        <ion-icon :icon="reorderFourOutline"></ion-icon>
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.reorder') }}
                        </span>
                    </ion-button>
                    <ion-button color="primary" @click="add()">
                        <ion-icon :icon="addOutline"></ion-icon>
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.add') }}
                        </span>
                    </ion-button>
                    <ion-button color="primary" @click="themeToggle()">
                        <ion-icon :icon="colorPaletteOutline"></ion-icon>
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.brush') }}
                        </span>
                    </ion-button>
                    <ion-button color="primary" @click="fontIncrese()">
                        <ion-label class="text-lg">
                            {{ $t('zikr.show.font') }}+
                        </ion-label>
                    </ion-button>
                    <ion-button color="primary" @click="fontDecrese()">
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
                style="font-size: 1.0rem"
            >
                <template v-for="(z, zinx) in category.azkar" :key="z.id">
                    <transition name="slide-fade" v-if="theme === 'base'">
                        <ion-item-sliding v-if="z.count > 0" class="my-2">
                            <ion-item-options side="start">
                                <ion-item-option
                                    color="primary"
                                    @click="share(z.body)"
                                >
                                    <ion-icon
                                        :icon="shareSocialOutline"
                                    ></ion-icon>
                                    <ion-label class="hidden sm:inline-block">
                                        {{ $t('show.item.share') }}
                                    </ion-label>
                                </ion-item-option>
                            </ion-item-options>
                            <ion-item
                                @click="z.count--"
                                class="select-none hover:cursor-pointer ion-activatable ripple-parent"
                                :color="zinx % 2 == 0 ? 'light' : ''"
                                dir="rtl"
                            >
                                <ion-label
                                    style="white-space: break-spaces;word-wrap: break-all;"
                                >
                                    {{ z.body }}
                                </ion-label>
                                <ion-ripple-effect></ion-ripple-effect>
                                <ion-note
                                    slot="end"
                                    :color="meta.color"
                                    class="px-2 m-0 font-bold text-md"
                                >
                                    {{ z.count }}
                                </ion-note>
                                <ion-reorder slot="end"></ion-reorder>
                            </ion-item>
                            <ion-item-options side="end">
                                <ion-item-option
                                    color="secondary"
                                    @click="add(z.body, z.count, z.id)"
                                >
                                    <ion-icon :icon="createOutline"></ion-icon>
                                    <ion-label class="hidden sm:inline-block">
                                        {{ $t('show.item.edit') }}
                                    </ion-label>
                                </ion-item-option>
                                <ion-item-option
                                    color="danger"
                                    @click="remove(z.id)"
                                >
                                    <ion-icon
                                        :icon="trashBinOutline"
                                    ></ion-icon>
                                    <ion-label class="hidden sm:inline-block">
                                        {{ $t('show.item.delete') }}
                                    </ion-label>
                                </ion-item-option>
                            </ion-item-options>
                        </ion-item-sliding>
                    </transition>
                    <transition name="slide-fade" v-if="theme === 'dev'">
                        <div
                            class="relative w-11/12 mx-auto mt-4 mb-8"
                            v-if="z.count > 0 && theme === 'dev'"
                        >
                            <div
                                class="relative px-3 pt-2 pb-4 overflow-hidden bg-gray-100 border border-gray-500 rounded-md shadow-2xl select-none hover:cursor-pointer ion-activatable ripple-parent "
                                @click="z.count--"
                                dir="rtl"
                            >
                                {{ z.body }}
                                <ion-reorder
                                    class="absolute top-0 left-0 z-10"
                                    v-if="reorder"
                                ></ion-reorder>
                                <ion-ripple-effect></ion-ripple-effect>
                            </div>
                            <div
                                :data-zinx="zinx"
                                class="relative flex flex-wrap w-11/12 p-1 py-1 mx-auto -m-3 text-sm rounded-md shadow-2xl select-none bg-primary-600 footer text-color"
                            >
                                <div
                                    class="relative w-1/2 overflow-hidden text-center border-r border-current ion-activatable ripple-parent hover:cursor-pointer"
                                    @click="z.count--"
                                >
                                    {{ $t('zikr.count') }}:
                                    <span
                                        class="w-4 h-4 p-1 text-xs border border-current rounded-full"
                                    >
                                        {{ z.count }}
                                    </span>
                                    <ion-ripple-effect></ion-ripple-effect>
                                </div>
                                <div
                                    class="relative w-1/2 overflow-hidden text-center ion-activatable ripple-parent hover:cursor-pointer"
                                    @click="showOprs(z)"
                                >
                                    <ion-icon :icon="cogOutline"></ion-icon>
                                    {{ $t('zikr.opr') }}
                                    <ion-ripple-effect></ion-ripple-effect>
                                </div>
                            </div>
                        </div>
                    </transition>
                </template>
            </ion-reorder-group>
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
        IonList,
        IonItem,
        IonLabel,
        IonRippleEffect,
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
        IonNote,
        IonReorderGroup,
        IonReorder,
        IonIcon,
        IonButtons,
        IonButton,
        IonFabButton,
        IonFab,
        alertController,
        actionSheetController,
    } from '@ionic/vue';
    import { Category } from '@/entities/Category';
    import db from '@/utils/db';
    import getCategoryIcon, { CategoryIcon } from '@/utils/getCategoryIcon';
    import {
        addOutline,
        colorPaletteOutline,
        reorderFourOutline,
        checkmarkDoneOutline,
        createOutline,
        trashBinOutline,
        shareSocialOutline,
        cogOutline,
        closeOutline
    } from 'ionicons/icons';
    import toast from '@/utils/toast';
    import { Zikr } from '@/entities/Zikr';
    import { getRepository, getConnection } from 'typeorm';
    import loader from '@/utils/loader';

    import { Plugins } from '@capacitor/core';

    const { Modals, Share, Clipboard } = Plugins;

    @Options({
        components: {
            IonPage,
            IonBackButton,
            IonToolbar,
            IonHeader,
            IonContent,
            IonList,
            IonItem,
            IonLabel,
            IonRippleEffect,
            IonItemSliding,
            IonItemOptions,
            IonItemOption,
            IonNote,
            IonReorderGroup,
            IonReorder,
            IonIcon,
            IonButtons,
            IonButton,
            IonFabButton,
            IonFab,
        },
    })
    export default class Show extends Vue {
        category: Category = new Category();
        meta: CategoryIcon | null = null;

        addOutline = addOutline;
        colorPaletteOutline = colorPaletteOutline;
        reorderFourOutline = reorderFourOutline;
        checkmarkDoneOutline = checkmarkDoneOutline;
        createOutline = createOutline;
        trashBinOutline = trashBinOutline;
        shareSocialOutline = shareSocialOutline;
        cogOutline = cogOutline;
        closeOutline = closeOutline;

        reorder = false;
        oldOrder: Zikr[] = [];
        loaderTxt = '';
        theme: 'base' | 'dev' = 'dev';

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
        }

        async showOprs(zikr: Zikr) {
            const actionSheet = await actionSheetController.create({
                header: this.$t('zikr.opr'),
                cssClass: 'opr-actions',
                backdropDismiss: true,
                buttons: [
                    {
                        text: this.$t('show.item.edit'),
                        icon: createOutline,
                        cssClass: 'editBtn',
                        handler: async () => {
                            await this.add(zikr.body, zikr.count, zikr.id);
                        },
                    },
                    {
                        text: this.$t('show.item.share'),
                        icon: shareSocialOutline,
                        cssClass: 'shareBtn',
                        handler: async () => {
                            await this.share(zikr.body);
                        },
                    },
                    {
                        text: this.$t('show.item.del'),
                        icon: trashBinOutline,
                        cssClass: 'deleteBtn',
                        handler: async () => {
                            await this.remove(zikr.id);
                        },
                    },
                    {
                        text: this.$t('show.close'),
                        icon: closeOutline,
                        role: 'cancel',
                        cssClass: 'cancelBtn',
                    },
                ],
            });
            return await actionSheet.present();
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

        themeToggle() {
            this.theme = this.theme === 'base' ? 'dev' : 'base';
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

            setTimeout(() => this.category.azkar.splice(inx, 1), 100);

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
            const el = document.querySelector(
                '.font-size-updater'
            ) as HTMLDivElement;

            if (!el) return;

            const fontSize = parseFloat(el.style.fontSize);

            if (fontSize >= 1.9) {
                toast(this.$t('zikr.err.font-increse'));
                return;
            }

            el.style.fontSize = fontSize + 0.1 + 'rem';
        }

        /**
         * decrese ion-label font size from 1.9rem to 0.9rem
         *
         * @returns void
         */
        fontDecrese(): void {
            const el = document.querySelector(
                '.font-size-updater'
            ) as HTMLDivElement;

            if (!el) return;

            const fontSize = parseFloat(el.style.fontSize);

            if (fontSize <= 0.9) {
                toast(this.$t('zikr.err.font-decrese'));
                return;
            }

            el.style.fontSize = fontSize - 0.1 + 'rem';
        }

        beforeMount() {
            this.meta = getCategoryIcon().filter(
                (x) => x.slug === (this.$route.params.slug as string)
            )[0];
        }

        mounted() {
            this.loaderTxt = this.$t('loderTxt');
            this.loadData();
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
    .opr-actions {
        button {
            @apply transition duration-300 ease-in;
            &:hover {
                @apply font-semibold;
            }
        }
        button.editBtn * {
            @apply text-blue-600;
        }
        button.shareBtn * {
            @apply text-teal-600;
        }
        button.deleteBtn * {
            @apply text-red-600;
        }
        button.cancelBtn * {
            @apply text-orange-600;
        }
    }
</style>
