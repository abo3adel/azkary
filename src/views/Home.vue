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
            <ion-button color="danger" fill="solid" @click="upload"
                >File</ion-button
            >
            <ion-button color="success" fill="solid" @click="logData"
                >show data</ion-button
            >

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
    } from '@ionic/vue';
    import ExploreContainer from '@/components/ExploreContainer.vue';
    import { Options, Vue } from 'vue-class-component';
    import seeder from '@/seeder';
    import clearDB from '../../database/clearDB';
    import db, { APP_DB_NAME } from '@/utils/db';
    import { FileChooser } from '@ionic-native/file-chooser';
    import { Plugins, FilesystemEncoding } from '@capacitor/core';
    import { UserEntity } from '@/schema/UserEntity';
    import { CategoryEntity } from '@/schema/CategoryEntity';
    import { ZikrEntity } from '@/schema/ZikrEntity';

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
            await clearDB(null, APP_DB_NAME);
            await seeder.run();
            alert('done seeding');
        }

        async logData() {
            const con = await db();
            console.log(await con.getRepository('user').find());
            console.log(await con.getRepository('category').find());
            console.log(await con.getRepository('zikr').find());
            const res = await (await db())
                .createQueryBuilder(CategoryEntity, 'categories')
                .leftJoinAndSelect('categories.azkar', 'azkar')
                .where({ slug: 'morning' })
                .orderBy('azkar.order', 'ASC')
                .addOrderBy('azkar.id', 'DESC')
                .getOneOrFail();
            console.log(res);

            const az = await con
                .createQueryBuilder(ZikrEntity, 'zikr')
                .getRawMany();

            console.log(az);
        }

        upload() {
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
