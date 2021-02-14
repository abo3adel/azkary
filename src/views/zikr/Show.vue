<template>
    <ion-page>
        <ion-header>
            <ion-toolbar :color="meta.color || 'primary'">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
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
            <ion-list>
                <ion-item v-for="z in category.azkar" :key="z.id">
                    <ion-label>
                        {{ z.body }}
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';

    import {
        IonPage,
        IonToolbar,
        IonHeader,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
    } from '@ionic/vue';
    import { Category } from '@/entities/Category';
    import db from '@/utils/db';
    import getCategoryIcon, { CategoryIcon } from '@/utils/getCategoryIcon';

    class Props {
        slug!: string;
    }

    @Options({
        components: {
            IonPage,
            IonToolbar,
            IonHeader,
            IonContent,
            IonList,
            IonItem,
            IonLabel,
        },
    })
    export default class Show extends Vue.with(Props) {
        category: Category = new Category();
        meta: CategoryIcon | null = null;

        async loadData() {
            const repo = await (await db()).getRepository(Category);
            this.category = await repo.findOneOrFail({
                slug: this.$route.params.slug as string,
            });
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
