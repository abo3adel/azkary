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
            <ion-toolbar color="light">
                <ion-buttons slot="start">
                    <ion-button color="primary">
                        about
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-button color="primary" @click="$router.replace('/settings')">
                        settings
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <div
                class="h-full bg-fixed bg-center bg-no-repeat bg-cover main myContent"
            >
                <ion-button color="primary" fill="solid" @click="seed"
                    >Seed DB</ion-button
                >
                <!-- <ion-button color="danger" fill="solid" @click="upload"
                    >File</ion-button
                >
                <ion-input type="file" name="image" @change="upload" /> -->
                <ion-button color="success" fill="solid" @click="logData"
                    >show data</ion-button
                >

                <ExploreContainer name="Home page" />
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
        // isPlatform,
    } from '@ionic/vue';
    import ExploreContainer from '@/components/ExploreContainer.vue';
    import { Options, Vue } from 'vue-class-component';
    import seeder from '@/seeder';
    import clearDB from '../../database/clearDB';
    import db, { APP_DB_NAME } from '@/utils/db';
    import { CategoryEntity } from '@/schema/CategoryEntity';
    import { ZikrEntity } from '@/schema/ZikrEntity';

    import { Plugins } from '@capacitor/core';
    const { Storage, StatusBar } = Plugins;

    @Options({
        components: {
            ExploreContainer,
            IonHeader,
            IonToolbar,
            IonTitle,
            IonContent,
            IonPage,
            IonButton,
            IonInput,
            IonButtons,
            IonLabel,
        },
    })
    export default class Home extends Vue {
        img = '';
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

            let ev = await Storage.get({key: 'notified'});
            console.log(ev.value);

            ev = await Storage.get({key: 'notified2'});
            console.log(ev.value);
            
        }

        // async upload(ev: any) {
        //     let r = '';

        //     if (isPlatform('desktop')) {
        //         console.log(ev.target.files);
        //         await Storage.set({
        //             key: 'sebha_img',
        //             value: (await convertBlobToBase64(
        //                 ev.target.files[0]
        //             )) as string,
        //         });
        //         this.img = (await convertBlobToBase64(
        //             ev.target.files[0]
        //         )) as string;
        //         const node = document.createElement('style');
        //         node.innerHTML = `.myContent{background-image: url('${this.img}')}`;
        //         document.documentElement.appendChild(node);
        //         return;
        //     }

        //     console.log('chooosed'.repeat(15), r);

        //     console.log(contents);
        // }

        mounted() {
            // Storage.get({ key: 'img' }).then((r) => {
            //     const node = document.createElement('style');
            //     node.innerHTML = `.myContent{background-image: url('${r.value}')}`;
            //     document.documentElement.appendChild(node);
            // });
            // StatusBar.setBackgroundColor({color: '#428cff'});
        }
    }
</script>
<style>
    .myContent {
        /* --background: red; */
    }
</style>
