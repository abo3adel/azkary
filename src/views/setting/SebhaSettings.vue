<template>
    <ion-page>
        <ion-toolbar>
            <ion-title><h3 class="hidden">a</h3></ion-title>
        </ion-toolbar>
        <ion-content class="ion-padding">
            <div class="">
                <h1>asdasdasd</h1>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import db from '@/utils/db';
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
        IonTitle,
    } from '@ionic/vue';

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
            IonTitle,
        },
    })
    export default class SebhaSettings extends Vue {
        mounted() {
            // 
        }
    }
</script>
