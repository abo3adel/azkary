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
                    {{ $t(`zikr.cat.${category.slug}`) }}
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
                    <ion-button color="primary" @click="add()">
                        <ion-icon :icon="addOutline"></ion-icon>
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.add') }}
                        </span>
                    </ion-button>
                    <ion-button color="primary" @click="adwwd()">
                        <ion-icon :icon="colorPaletteOutline"></ion-icon>
                        <span class="hidden sm:inline-block">
                            {{ $t('zikr.show.brush') }}
                        </span>
                    </ion-button>
                    <ion-button color="primary" @click="adwwd()">
                        {{ $t('zikr.show.increse') }}+
                    </ion-button>
                    <ion-button color="primary" @click="adwwd()">
                        {{ $t('zikr.show.decrese') }}-
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-reorder-group
                @ionItemReorder="doReorder($event)"
                :disabled="true"
            >
                <transition-group name="list" tag="div">
                    <template v-for="(z, zinx) in category.azkar" :key="z.id">
                        <transition name="slide-fade">
                            <ion-item-sliding v-if="z.count > 0" class="my-2">
                                <ion-item-options side="start">
                                    <ion-item-option
                                        color="primary"
                                        @click="share(item)"
                                    >
                                        Share
                                    </ion-item-option>
                                </ion-item-options>

                                <ion-item
                                    @click="z.count--"
                                    class="hover:cursor-pointer ion-activatable ripple-parent"
                                    :color="zinx % 2 == 0 ? 'light' : ''"
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
                                        color="danger"
                                        @click="unread(item)"
                                    >
                                        Delete
                                    </ion-item-option>
                                </ion-item-options>
                            </ion-item-sliding>
                        </transition>
                    </template>
                </transition-group>
            </ion-reorder-group>
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
    } from '@ionic/vue';
    import { Category } from '@/entities/Category';
    import db from '@/utils/db';
    import getCategoryIcon, { CategoryIcon } from '@/utils/getCategoryIcon';
    import { addOutline, colorPaletteOutline } from 'ionicons/icons';

    class Props {
        slug!: string;
    }

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
        },
    })
    export default class Show extends Vue.with(Props) {
        category: Category = new Category();
        meta: CategoryIcon | null = null;
        addOutline = addOutline;
        colorPaletteOutline = colorPaletteOutline;

        async loadData() {
            const repo = await (await db()).getRepository(Category);
            this.category = await repo.findOneOrFail({
                slug: this.$route.params.slug as string,
            });
        }

        doReorder(event: CustomEvent) {
            // The `from` and `to` properties contain the index of the item
            // when the drag started and ended, respectively
            console.log(
                'Dragged from index',
                event.detail.from,
                'to',
                event.detail.to
            );

            // Finish the reorder and position the item in the DOM based on
            // where the gesture ended. This method can also be called directly
            // by the reorder group
            event.detail.complete();
        }

        beforeMount() {
            this.meta = getCategoryIcon().filter(
                (x) => x.slug === (this.$route.params.slug as string)
            )[0];
        }

        mounted() {
            this.loadData();
        }
    }
</script>
<style>
    /* ion-item:first-child {
        background: red;
        color:#fff;
    } */
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active,
    .list-leave-active {
        transition: all 1s ease;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(-30px);
    }

    .list-move {
        transition: transform 0.8s ease;
    }
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>
