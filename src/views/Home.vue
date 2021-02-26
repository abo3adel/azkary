<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary" class="haveBg">
                <ion-title>Home</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-header collapse="condense">
                <ion-title>Home</ion-title>
            </ion-header>
            <ion-toolbar style="--background: transparent;">
                <ion-buttons slot="start">
                    <ion-button color="primary">
                        <ion-icon :icon="informationOutline" slot="start" />
                        <ion-label class="hidden sm:inline-block">about</ion-label>
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-button
                        color="primary"
                        @click.prevent="$router.replace('/settings')"
                    >
                        <ion-icon :icon="cogOutline" slot='start' />
                        <ion-label class="hidden sm:inline-block">settings</ion-label>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <div class="h-full">
                <!--  -->
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
    import { cogOutline, informationOutline } from 'ionicons/icons';

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
    })
    export default class Home extends Vue {
        cogOutline = cogOutline;
        informationOutline = informationOutline;

        mounted() {
            //
        }
    }
</script>
<style></style>
