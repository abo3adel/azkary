<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary" class="haveBg">
                <ion-title>Home</ion-title>
                <ion-label slot="end" class="mx-1">
                    {{ hijir }}
                </ion-label>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-header collapse="condense">
                <ion-title>Home</ion-title>
            </ion-header>
            <ion-toolbar :color="bg">
                <ion-buttons slot="start">
                    <ion-button color="light">
                        <ion-icon
                            :icon="informationCircleOutline"
                            slot="start"
                        />
                        <ion-label class="hidden sm:inline-block"
                            >about</ion-label
                        >
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-button
                        color="light"
                        @click.prevent="$router.replace('/settings')"
                    >
                        <ion-icon :icon="cogOutline" slot="start" />
                        <ion-label class="hidden sm:inline-block"
                            >settings</ion-label
                        >
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <div
                class="pb-8"
                :style="`background-color: var(--ion-color-${bg})`"
            >
                <h1
                    style="font-family: 'ArefRuqaa-Regular';"
                    class="text-6xl text-center text-white"
                >
                    أذكارى
                </h1>
                <p class="pt-2 text-center text-gray-200" style="font-family: 'ArefRuqaa-Regular';">عطر فمك بذكر الله</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButton,
        IonInput,
        IonButtons,
        IonLabel,
        IonIcon,
        // isPlatform,
    } from '@ionic/vue';
    import { Options, Vue } from 'vue-class-component';
    import { cogOutline, informationCircleOutline } from 'ionicons/icons';
    import getHijirDate from '@/common/getHijirDate';

    // import { Plugins } from '@capacitor/core';
    // const { Storage } = Plugins;

    @Options({
        components: {
            IonHeader,
            IonToolbar,
            IonTitle,
            IonContent,
            IonPage,
            IonButton,
            IonInput,
            IonButtons,
            IonLabel,
            IonIcon,
        },
        inject: ['lang'],
    })
    export default class Home extends Vue {
        hijir = '';
        bg = 'gold';

        cogOutline = cogOutline;
        informationCircleOutline = informationCircleOutline;

        async mounted() {
            // @ts-ignore
            this.hijir = getHijirDate(this.lang);
            console.log(new Date().getHours());

            if (new Date().getHours() > 12) {
                this.bg = 'tertiary';
            }
        }
    }
</script>
<style></style>
