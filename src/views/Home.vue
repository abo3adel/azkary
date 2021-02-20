<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="danger" class="haveBg">
                <ion-title>Home</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Home</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-button color="primary" fill="solid" @click="seed"
                >Seed DB</ion-button
            >
            <ion-button color="danger" fill="solid" @click="upload">
                File
            </ion-button>
            <ion-button color="success" fill="solid" @click="showData">
                ShowData
            </ion-button>

            <ExploreContainer name="Home page" />
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
        isPlatform,
    } from '@ionic/vue';
    import ExploreContainer from '@/components/ExploreContainer.vue';
    import { Options, Vue } from 'vue-class-component';
    import seeder from '@/seeder';
    import clearDB from '../../database/clearDB';
    import db, { APP_DB_NAME } from '@/utils/db';
    import { FileChooser } from '@ionic-native/file-chooser';
    import { Plugins, FilesystemEncoding } from '@capacitor/core';
    import { Category } from '@/entities/Category';
    import { Zikr } from '@/entities/Zikr';

    const { Filesystem } = Plugins;

    @Options({
        components: {
            ExploreContainer,
            IonHeader,
            IonToolbar,
            IonTitle,
            IonContent,
            IonPage,
            IonButton,
        },
    })
    export default class Home extends Vue {
        async seed() {
            // const d = await db();
            // console.log(
            //     'Connection Name5564: ' + d.name,
            //     d.driver,
            //     d.entityMetadatas
            // );
            await clearDB(null, APP_DB_NAME);
            await seeder.run();
            console.log('done seeding');
        }

        async showData() {
            const d = await db();
            console.log(await d.getRepository(Category).find());
            console.log(JSON.stringify(await d.getRepository(Zikr).find()));
        }

        upload() {
            console.log(isPlatform('capacitor'), isPlatform('mobile'));

            FileChooser.open()
                .then(async (r: any) => {
                    console.log('chooosed'.repeat(15), r);
                    const contents = await Filesystem.readFile({
                        path: r,
                        // directory: FilesystemDirectory.Documents,
                        encoding: FilesystemEncoding.UTF8,
                    });
                    console.log(contents);
                })
                .catch((err: any) => console.log(err));
        }
    }
</script>
