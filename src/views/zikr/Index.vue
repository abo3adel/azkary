<template>
<ion-page class='bg-page'>
        <ion-header>
            <ion-toolbar color='primary'>
                <ion-back-button icon="home"></ion-back-button>
                <h3 class='p-4 pb-8 uppercase bg-primary-600'>{{$t('zikr.toolbar')}}</h3>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen='true'>
            <h1>asdsad</h1>
        </ion-content>
</ion-page> 
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import db from '@/utils/db';
    import { Category } from '@/entities/Category';
    import { IonToolbar, IonBackButton, IonPage, IonHeader, IonContent } from '@ionic/vue';

    @Options({
        components: {
            IonToolbar,
            IonBackButton,
            IonPage,
            IonHeader,
            IonContent
        },
    })
    export default class ZikrIndex extends Vue {
        mounted() {
            db().then((con) => {
                const repo = con.getRepository(Category);
                repo.find().then((r) => console.log(r));
            });
        }
    }
</script>
