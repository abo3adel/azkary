<template>
    <ion-page>
        <ion-toolbar color="primary">
            <ion-title>
                <ion-icon
                    :icon="informationCircleOutline"
                    class="align-middle"
                />
                {{ $t('home.btn.about') }}
            </ion-title>
            <ion-buttons slot="end">
                <ion-button
                    color="light"
                    @click.prevent="$router.replace('/tabs/home')"
                >
                    <ion-icon slot="icon-only" :icon="home" />
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-content class="text-center ion-padding">
            <div class="w-1/3 mx-auto">
                <img
                    src="/assets/icon/android-chrome-256x256.png"
                    class="object-cover w-full h-full"
                />
            </div>
            <h1 class="mt-3 text-5xl">
                {{ $t('app.slideName') }}
            </h1>
            <hr class="w-1/4 h-1 mx-auto my-6 bg-gray-500" />
            <h3 class="text-2xl">{{ $t('app.download') }}</h3>
            <p class="mt-4 text-2xl">
                {{ $t('app.slide.pcMess') }}
            </p>
            <ion-button
                color="primary"
                size="large"
                @click.prevent="copyLink"
                class="mt-3"
            >
                {{ $t('app.slide.pcCopy') }}
            </ion-button>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import {
        IonPage,
        IonToolbar,
        IonButtons,
        IonButton,
        IonIcon,
        IonTitle,
        IonContent,
    } from '@ionic/vue';
    import { home, informationCircleOutline } from 'ionicons/icons';

    import { Plugins } from '@capacitor/core';
    import toast from '@/utils/toast';

    const { Clipboard } = Plugins;

    @Options({
        components: {
            IonPage,
            IonToolbar,
            IonButtons,
            IonButton,
            IonIcon,
            IonTitle,
            IonContent,
        },
    })
    export default class About extends Vue {
        home = home;
        informationCircleOutline = informationCircleOutline;

        copyLink() {
            Clipboard.write({
                string: 'http://abo3adel.github.io',
            });

            toast(this.$t('app.copied'));
        }
    }
</script>
