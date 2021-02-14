<template>
    <ion-page class="bg-page">
        <ion-header>
            <ion-toolbar color="primary">
                <h3 class="p-4 pb-8 uppercase bg-primary-600">
                    {{ $t('zikr.toolbar') }}
                </h3>
                <ion-buttons slot="end">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="pt-10">
                <div
                    v-for="(cat, inx) in categories"
                    :key="cat.id"
                    class="w-full"
                >
                    <ion-button
                        :color="icons[inx].color"
                        expand="block"
                        class="mb-5"
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

    import { sunnyOutline, cloudyNightOutline, alarmOutline } from 'ionicons/icons';

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
        icons: { type: string; name?: string; color: string }[] = [
            {
                type: 'icon',
                name: sunnyOutline,
                color: 'gold',
            },
            {
                type: 'icon',
                name: cloudyNightOutline,
                color: 'tertiary',
            },
            {
                type: 'svg',
                name: 'mosque',
                color: 'secondary',
            },
            {
                type: 'icon',
                name: alarmOutline,
                color: 'success',
            },
            {
                type: 'svg',
                name: 'half-moon',
                color: 'danger',
            },
            {
                type: 'svg',
                name: 'julus',
                color: 'primary',
            },
        ];

        async loadCategories() {
            const con = await db();
            const categories = await con.createQueryBuilder()
                .from(Category, 'Category')
                .execute();

            categories.pop();
            this.categories = categories;
        }

        mounted() {
            this.loadCategories();
        }
    }
</script>
