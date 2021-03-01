<template>
    <ion-slides
        class="h-full bg-gradient-to-tr from-gray-50 to-gray-200"
        :options="slideOpts"
        :pager="true"
        dir="rtl"
    >
        <ion-slide class="">
            <div class="slide">
                <div class="w-1/2 mx-auto">
                    <img
                        src="/assets/slides/icon.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <h1 class="mt-3 text-3xl">{{ $t('app.slideName') }}</h1>
            </div>
        </ion-slide>

        <ion-slide>
            <div class="slide">
                <div class="w-1/3 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/muslim.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <h2 class="block text-2xl">{{ $t('app.slide.azkar') }}</h2>
                <p>
                    {{ $t('app.slide.azkarMess') }}
                </p>
            </div>
        </ion-slide>

        <ion-slide>
            <div class="slide">
                <div class="w-1/3 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/praying.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <h2 class="block text-2xl">{{ $t('app.slide.ad3ia') }}</h2>
                <p>
                    {{ $t('app.slide.ad3iaMess') }}
                </p>
            </div>
        </ion-slide>

        <ion-slide>
            <div class="slide">
                <div class="w-1/3 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/tasbih.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <h2 class="block text-2xl">{{ $t('app.slide.sebha') }}</h2>
                <p>
                    {{ $t('app.slide.sebhaMess') }}
                </p>
            </div>
        </ion-slide>

        <ion-slide>
            <div class="slide">
                <div class="w-1/3 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/computer.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <h2 class="block text-2xl">{{ $t('app.slide.pc') }}</h2>
                <p>
                    {{ $t('app.slide.pcMess') }}
                </p>
                <ion-button color="primary" @click.prevent="copyLink">
                    {{ $t('app.slide.pcCopy') }}
                </ion-button>
            </div>
        </ion-slide>

        <ion-slide>
            <div class="slide">
                <div class="w-1/3 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/correction.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <ion-button color="primary" @click.prevent="$emit('start')">
                    {{ $t('app.slide.start') }}
                </ion-button>
            </div>
        </ion-slide>
    </ion-slides>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import { IonSlides, IonSlide, IonButton } from '@ionic/vue';

    import { Plugins } from '@capacitor/core';
    import toast from '@/utils/toast';

    const { Clipboard } = Plugins;

    @Options({
        components: { IonSlides, IonSlide, IonButton },
        emits: ['start'],
    })
    export default class FirstTimeSlides extends Vue {
        slideOpts = {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
        };

        copyLink() {
            Clipboard.write({
                string: 'http://abo3adel.github.io',
            });

            toast(this.$t('app.copied'));
        }
    }
</script>
<style>
    .swiper-pagination {
        --bullet-background: #000;
    }
</style>
