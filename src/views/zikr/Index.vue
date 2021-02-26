<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary" class="haveBg">
                <h3 class="p-4 pb-8 uppercase">
                    {{ $t('zikr.toolbar') }}
                </h3>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar color="primary">
                    <h3 class="p-4 pb-8 uppercase">
                        {{ $t('zikr.toolbar') }}
                    </h3>
                </ion-toolbar>
            </ion-header>

            <div class="pt-10">
                <div
                    v-for="(cat, inx) in categories"
                    :key="cat.id"
                    class="w-full haveBg"
                >
                    <ion-button
                        :color="icons[inx].color"
                        expand="block"
                        class="mb-5"
                        :router-link="`/zikr/${cat.slug}`"
                        size="large"
                    >
                        <span class="absolute left-0">
                            {{ $t(`zikr.cat.${cat.slug}`) }}
                        </span>
                        <ion-icon
                            v-if="icons[inx].type === 'svg'"
                            :src="`/assets/icons/${icons[inx].name}.svg`"
                            class="absolute right-0 text-4xl"
                        ></ion-icon>
                        <ion-icon
                            v-else
                            :icon="icons[inx].name"
                            class="absolute right-0 text-4xl"
                        ></ion-icon>
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import db from '@/utils/db';
    import { Category } from '@/entities/Category';
    import {
        IonToolbar,
        IonBackButton,
        IonPage,
        IonHeader,
        IonContent,
        IonButtons,
        IonList,
        IonItem,
        IonButton,
        IonRippleEffect,
        IonIcon,
    } from '@ionic/vue';
    import getCategoryIcon, { CategoryIcon } from '@/utils/getCategoryIcon';
    import { CategoryEntity } from '@/schema/CategoryEntity';

    @Options({
        components: {
            IonToolbar,
            IonBackButton,
            IonPage,
            IonHeader,
            IonContent,
            IonButtons,
            IonList,
            IonItem,
            IonButton,
            IonRippleEffect,
            IonIcon,
        },
    })
    export default class ZikrIndex extends Vue {
        categories: Category[] = [];
        icons: CategoryIcon[] = getCategoryIcon();

        async loadCategories() {
            const con = await db();
            const categories = await con
                .createQueryBuilder()
                .from(CategoryEntity, 'category')
                .execute();

            this.categories = categories;
        }

        mounted() {
            this.loadCategories();
        }
    }
</script>
