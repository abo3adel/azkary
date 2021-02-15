<template>
    <ion-page>
        <ion-header>
            <ion-toolbar :color="meta.color || 'primary'">
                <ion-buttons slot="start">
                    <ion-back-button
                        default-href="/tabs/home"
                        :text="$t('backBtn')"
                    ></ion-back-button>
                </ion-buttons>
                <h3 class="p-4 pb-8 uppercase">
                    {{ $t(`zikr.cat.${category.slug}`) }}
                </h3>
                <ion-icon
                    v-if="meta.type === 'svg'"
                    :src="`/assets/icons/${meta.name}.svg`"
                    class="absolute right-0 text-6xl top-2"
                ></ion-icon>
                <ion-icon
                    v-else
                    :icon="meta.name"
                    class="absolute right-0 text-6xl top-2"
                ></ion-icon>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-reorder-group
                @ionItemReorder="doReorder($event)"
                :disabled="false"
            >
                <ion-item-sliding v-for="z in category.azkar" :key="z.id">
                    <ion-item-options side="start">
                        <ion-item-option color="primary" @click="share(item)">
                            Share
                        </ion-item-option>
                    </ion-item-options>

                    <ion-item class="hover:cursor-pointer">
                        <ion-label
                            style="white-space: break-spaces;word-wrap: break-all;"
                        >
                            {{ z.body }}
                        </ion-label>
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-note
                            slot="end"
                            :color="meta.color"
                            class="text-lg font-bold"
                        >
                            {{ z.count }}
                        </ion-note>
                        <ion-reorder slot="end"></ion-reorder>
                    </ion-item>

                    <ion-item-options side="end">
                        <ion-item-option color="danger" @click="unread(item)">
                            Delete
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
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
    } from '@ionic/vue';
    import { Category } from '@/entities/Category';
    import db from '@/utils/db';
    import getCategoryIcon, { CategoryIcon } from '@/utils/getCategoryIcon';
    import { Zikr } from '@/entities/Zikr';

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
        },
    })
    export default class Show extends Vue.with(Props) {
        category: Category = new Category();
        meta: CategoryIcon | null = null;
        // items: Zikr[] = []

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
