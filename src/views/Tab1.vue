<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Tab 1</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Tab 1</ion-title>
                </ion-toolbar>
            </ion-header>

            <ExploreContainer name="Tab 1 page" />
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
            db: {from: 'db'}
        }
    })
    export default class Tab1 extends Vue {
        mounted() {
            // @ts-ignore
            (this.db as Promise<Connection>).then(async (con: Connection) => {
                // const user = new User();
                // user.name = 'Ahmed Adel';
                // user.azkarCount = 50;

                const repo = con.getRepository(User);
                // await repo.save(user);
                // console.log('user has been saved');

                const all = await repo.find();
                console.log(all);
            });
        }
    }
</script>
