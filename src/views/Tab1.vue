<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Tab 1</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Tab 1</ion-title>
                </ion-toolbar>
            </ion-header>

            <!-- <ExploreContainer name="Tab 1 page" /> -->
            <div style="margin-top: 50px">
                <div v-for="zikr of azkar" :key="zikr.id">
                    {{ zikr.body }}
                </div>
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
    } from '@ionic/vue';
    import ExploreContainer from '@/components/ExploreContainer.vue';
    import { Options, Vue } from 'vue-class-component';
    // import db from '@/utils/db';
    import { User } from '@/entities/User';
    import { Connection } from 'typeorm';
    import db, { APP_DB_NAME } from '@/utils/db';
    import { Zikr } from '@/entities/Zikr';
    import { ZikrFactory } from '../../database/factory/ZikrFactory';

    @Options({
        components: {
            ExploreContainer,
            IonHeader,
            IonToolbar,
            IonTitle,
            IonContent,
            IonPage,
        },
        inject: {
            db: { from: 'db' },
        },
    })
    export default class Tab1 extends Vue {
        azkar: Zikr[] = [];

        mounted() {
            db().then(async (con: Connection) => {
                // ZikrFactory.with(1).count(15).setConName(APP_DB_NAME).create().then(r => r);

                const repo = con.getRepository(Zikr);
                // await repo.save(user);
                // console.log('user has been saved');

                repo.find().then((r) => (this.azkar = r));
            });
        }
    }
</script>
