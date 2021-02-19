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
                @click.prevent="count++"
                style="background-image: url('/assets/img/ka3ba2.jpg')"
            >
                <div class="flex w-full h-full bg-black bg-opacity-20">
                    <h1 class="pt-4 mx-auto text-6xl font-semibold">
                        {{ count }}
                        <div
                            id="container"
                            class="releative"
                        ></div>
                    </h1>
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

    @Options({
        components: { IonPage, IonToolbar, IonButtons, IonButton, IonContent },
    })
    export default class SebhaView extends Vue {
        bar: any;
        count = 0;

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
                        const value = Math.round(circle.value() * 5);
                        if (value === 0) {
                            circle.setText('');
                        } else {
                            circle.setText(`${value}/${5}`);
                        }
                    },
                }
            );
            // this.bar.svg.style.height = '7rem'; // responsive
            this.bar.text.style.fontSize = 'inherit'; // control with tailwind
            this.bar.animate(1);
        }

        mounted() {
            this.setProgressBar();
        }
    }
</script>
