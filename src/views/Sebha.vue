<template>
    <ion-page>
        <ion-toolbar color="primary">
            <ion-buttons>
                <ion-button>asdsad</ion-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-content :fullscreen="true" class="select-none">
            <div
                class="flex h-full text-white bg-fixed bg-no-repeat bg-cover"
                @click.prevent="onClick()"
                style="background-image: url('/assets/img/ka3ba2.jpg')"
            >
                <div class="flex w-full h-full bg-black bg-opacity-20">
                    <div class="m-auto text-6xl font-semibold">
                        <div id="container" class="releative"></div>
                    </div>
                </div>
            </div>
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
        IonContent,
    } from '@ionic/vue';
    // @ts-ignore
    import ProgressBar from 'progressbar.js/dist/progressbar';
    import { Plugins } from '@capacitor/core';

    const { Storage } = Plugins;
    import { Sebha } from '@/entities/Sebha';
    import db from '@/utils/db';
    import loader from '@/utils/loader';
    import { getConnection } from 'typeorm';

    @Options({
        components: { IonPage, IonToolbar, IonButtons, IonButton, IonContent },
    })
    export default class SebhaView extends Vue {
        bar: any;
        tasabeeh: Sebha[] = [];
        active = 0;
        sebha = new Sebha();

        async loadTasabeeh() {
            await loader.show();
            this.tasabeeh = await (await db()).getRepository(Sebha).find();
            await loader.hide();
            this.sebha = this.tasabeeh[this.active];
            this.sebha.current = 1;
            this.sebha.max = 5;
            console.log(this.sebha.readed);

            this.bar.set(this.sebha.current / this.sebha.max);
        }

        async onClick() {
            this.sebha.current++;
            if (this.sebha.current >= this.sebha.max) {
                
                this.bar.set(1);
                // increment readed value
                await getConnection().query(
                    'UPDATE tasabeeh AS ts SET readed = readed +1 WHERE id = ?',
                    [this.sebha.id]
                );
                // reset current
                this.sebha.current = 0;
            }

            this.bar.animate(this.sebha.current / this.sebha.max);

            // update db with current value
            await getConnection()
                .createQueryBuilder(Sebha, 'tasabeeh')
                .update()
                .set({ current: this.sebha.current })
                .where({ id: this.sebha.id })
                .execute();
        }

        /**
         * iniate progress bar
         */
        setProgressBar() {
            this.bar = new ProgressBar.Circle(
                document.querySelector('#container'),
                {
                    color: 'var(--ion-color-primary)',
                    strokeWidth: 4,
                    trailWidth: 1,
                    easing: 'easeInOut',
                    trailColor: 'var(--ion-color-primary)',
                    duration: 600,
                    text: {
                        autoStyleContainer: false,
                    },
                    from: { color: '#3171e0', width: 2 },
                    to: { color: '#28ba62', width: 5 },
                    step: (state: any, circle: any) => {
                        circle.path.setAttribute('stroke', state.color);
                        circle.path.setAttribute('stroke-width', state.width);
                        const value = Math.round(
                            circle.value() * this.sebha.max ?? 10
                        );
                        if (value === 0 || !this.sebha.max) {
                            circle.setText('');
                        } else {
                            circle.setText(`${value}/${this.sebha.max ?? 10}`);
                        }
                    },
                }
            );
            // this.bar.svg.style.height = '7rem'; // responsive
            this.bar.text.style.fontSize = 'inherit'; // control with tailwind
        }

        beforeMount() {
            Storage.get({ key: 'sebha' }).then(
                (r) => (this.active = parseInt(r.value ?? '0'))
            );
        }

        mounted() {
            this.setProgressBar();
            this.loadTasabeeh();
        }
    }
</script>
