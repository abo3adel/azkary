<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary" class="haveBg">
                <ion-title>
                    <span class="uppercase">
                        {{ $t(`${type}.toolbar`) }}
                    </span>
                </ion-title>
                <template v-if="type === 'zikr'">
                    <ion-buttons slot="end">
                        <ion-button
                            type="button"
                            tab="notify"
                            @click.prevent="$router.replace('/notifiy_azkar')"
                        >
                            <ion-icon
                                slot="end"
                                src="/assets/icons/ramadan.svg"
                                style="font-size: 2.3rem;"
                            />
                            <ion-label>{{ $t('zikr.notify.title') }}</ion-label>
                        </ion-button>
                    </ion-buttons>
                </template>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar color="primary">
                    <ion-title>
                        <span class="uppercase">
                            {{ $t(`${type}.toolbar`) }}
                        </span>
                    </ion-title>
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
                        :router-link="`/${type}/${cat.slug}`"
                        size="large"
                    >
                        <ion-label class="w-full text-left rtl:text-right">
                            {{ $t(`zikr.cat.${cat.slug}`) }}
                        </ion-label>
                        <template v-if="type === 'zikr'">
                            <ion-icon
                                v-if="icons[inx].type === 'svg'"
                                :src="`/assets/icons/${icons[inx].name}.svg`"
                                class="text-5xl"
                                slot="end"
                            ></ion-icon>
                            <ion-icon
                                v-else
                                :icon="icons[inx].name"
                                class="text-5xl"
                                slot="end"
                            ></ion-icon>
                        </template>
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue, prop } from 'vue-class-component';
    import db from '@/utils/db';
    import { Category } from '@/entities/Category';
    import {
        IonToolbar,
        IonBackButton,
        IonPage,
        IonHeader,
        IonTitle,
        IonContent,
        IonButtons,
        IonList,
        IonItem,
        IonButton,
        IonRippleEffect,
        IonIcon,
        IonLabel,
    } from '@ionic/vue';
    import getCategoryIcon, { CategoryIcon } from '@/utils/getCategoryIcon';
    import { CategoryEntity, CategoryType } from '@/schema/CategoryEntity';

    class Props {
        type = prop<string>({ default: CategoryType.Zikr });
    }

    @Options({
        components: {
            IonToolbar,
            IonBackButton,
            IonPage,
            IonHeader,
            IonTitle,
            IonContent,
            IonButtons,
            IonList,
            IonItem,
            IonButton,
            IonRippleEffect,
            IonIcon,
            IonLabel,
        },
    })
    export default class ZikrIndex extends Vue.with(Props) {
        categories: Category[] = [];
        icons: CategoryIcon[] = getCategoryIcon();

        async loadCategories() {
            const con = await db();
            const categories = await con
                .getRepository<Category>('category')
                .find({
                    type: this.type ?? CategoryType.Zikr,
                });

            this.categories = categories;
        }

        mounted() {
            if (this.type === CategoryType.Du3a) {
                this.icons = this.icons.slice(10);
            }
            this.loadCategories();
        }
    }
</script>
