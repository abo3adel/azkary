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
                    <ion-button
                        color="primary"
                        @click="$router.replace('/settings')"
                    >
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
                <ion-button
                    color="success"
                    fill="solid"
                    @click="draw(Math.random() * 100)"
                    >draw</ion-button
                >

                <div class="relative w-40 h-40">
                    <Progress id="someOfMe" ref='bar'>
                        <span>asdasdasd</span>
                    </Progress>
                </div>

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
    import Progress from '@/components/Progress.vue';

    import { Plugins } from '@capacitor/core';
    const { Storage } = Plugins;

    // @ts-ignore
    // import CPB from 'cyprobar'

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
            Progress,
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

            let ev = await Storage.get({ key: 'notified' });
            console.log(ev.value);

            ev = await Storage.get({ key: 'notified2' });
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

        draw(n = 0) {

            (this.$refs.bar as Progress).set(.6)
            // const shape = document.querySelector(
            //     'circle.example-indicator'
            // ) as HTMLDivElement;
            // // shape.setAttribute('stroke-dashoffset', `${n}`);
            // const strokeArr = parseInt(shape.style.strokeDasharray);
            // shape.style.strokeDashoffset = `${(strokeArr - (.8 * strokeArr))}`;
        }

        mounted() {
            // Storage.get({ key: 'img' }).then((r) => {
            //     const node = document.createElement('style');
            //     node.innerHTML = `.myContent{background-image: url('${r.value}')}`;
            //     document.documentElement.appendChild(node);
            // });
            // StatusBar.setBackgroundColor({color: '#428cff'});
            // @ts-ignore
            // window.CPB.draw({
            //     elementClass: 'example',
            //     value: 0,
            //     indicatorColor: 'useGradient',
            //     indicatorCap: 'round',
            //     // useText: true,
            //     // setText: '',
            //     barSize: 1,
            //     setGradient: [
            //         ['#a8e6ce', 0],
            //         ['#dcedc2', 20],
            //         ['#ffd385', 40],
            //         ['#ffaaa6', 60],
            //         ['#ff8c94', 80],
            //     ],
            // });
            // const el = (document.querySelector('.example svg') as HTMLDivElement);
            // el.removeAttribute('width')
            // el.removeAttribute('height');
        }
    }
</script>
<style>
    circle.example-indicator {
        /* calculate using: (2 * PI * R) */
        /* stroke-dasharray: 227; */
        /* stroke-dashoffset: 0; */
        transition: all 0.5s;
        /* animation-iteration-count: infinite; */
        /* animation-name: rotate;
            animation-duration: 2s;
            animation-direction: alternate;
            animation-timing-function: linear; */
    }

    @keyframes rotate {
        to {
            stroke-dashoffset: 500;
        }
    }
</style>
