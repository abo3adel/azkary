<template>
    <ion-page>
        <ion-toolbar color="primary">
            <ion-title>
                <ion-icon
                    :icon="informationCircleOutline"
                    class="align-middle"
                />
                {{ $t('home.btn.about') }}
            </ion-title>
            <ion-buttons slot="end">
                <ion-button
                    color="light"
                    @click.prevent="$router.replace('/tabs/home')"
                >
                    <ion-icon slot="icon-only" :icon="home" />
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-content class="text-center ion-padding">
            <div class="w-1/3 mx-auto">
                <img
                    src="/assets/icon/android-chrome-192x192.png"
                    class="object-cover w-full h-full"
                />
            </div>
            <h1 class="mt-3 text-3xl">
                {{ $t('app.slideName') }}
            </h1>
            <h2 class="mt-1 text-lg">
                {{ $t('app.version') }}:
                <span dir="ltr">1.0.3</span>
            </h2>
            <hr class="w-1/4 mx-auto my-6 border border-gray-700" />
            <h3 class="text-2xl">{{ $t('app.download') }}</h3>
            <div class="flex flex-wrap mt-2">
                <div class="w-full text-center border-r sm:border-gray-500 rtl:border-r-0 rtl:border-l sm:w-1/2">
                    <p class="mt-4 text-lg">
                        {{ $t('app.slide.thisAvalFor') }} {{ $t('app.slide.forPc') }}
                    </p>
                    <ion-button
                        color="primary"
                        @click.prevent="
                            openLink(
                                'https://github.com/abo3adel/azkary/releases/latest/download/Azkary-Setup.exe'
                            )
                        "
                        class="mt-3"
                    >
                        {{ $t('app.slide.pcCopy') }}
                    </ion-button>
                </div>
                <div class="w-full text-center border-l sm:border-gray-500 rtl:border-l-0 rtl:border-r sm:w-1/2">
                    <p class="mt-4 text-lg">
                        {{ $t('app.slide.thisAvalFor') }} {{ $t('app.slide.forPhone') }}
                    </p>
                    <ion-button
                        color="primary"
                        @click.prevent="
                            openLink(
                                'http://play.google.com/store/apps/details?id=com.ninjacoder.azkary'
                            )
                        "
                        class="mt-3"
                    >
                        {{ $t('app.slide.pcCopy') }}
                    </ion-button>
                </div>
            </div>
        </ion-content>
        <div class="p-2 mt-3 text-white bg-gray-900 footer" dir="ltr">
            <p>
                App repository @
                <a href="https://github.com/abo3adel/myazkar" target="_blank"
                    >GITHUB</a
                >.
            </p>
            <hr class="w-1/2 my-1 border border-gray-500" />
            <div>
                <p>
                    Content &copy; from
                    <a href="https://www.islambook.com/" target="_blank"
                        >Islam Book</a
                    >.
                </p>
                <hr class="w-1/2 my-1 border border-gray-500" />
                <p>
                    Icons made by
                    <a
                        href="https://www.freepik.com"
                        title="Freepik"
                        target="_blank"
                        >Freepik</a
                    >
                    from
                    <a
                        href="https://www.flaticon.com/"
                        title="Flaticon"
                        target="_blank"
                        >flaticon.com</a
                    >.
                </p>
                <!-- <hr class="w-1/2 my-1 border border-gray-500" />
                <p>
                    Made with <span class="text-red-500">&hearts;</span> by
                    <a href="http://abo3adel.github.io/" target="_blank"
                        >TheNinjaCoder</a
                    >
                </p> -->
            </div>
        </div>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import {
        IonPage,
        IonToolbar,
        IonButtons,
        IonButton,
        IonIcon,
        IonTitle,
        IonContent,
    } from '@ionic/vue';
    import { home, informationCircleOutline } from 'ionicons/icons';

    @Options({
        components: {
            IonPage,
            IonToolbar,
            IonButtons,
            IonButton,
            IonIcon,
            IonTitle,
            IonContent,
        },
    })
    export default class About extends Vue {
        home = home;
        informationCircleOutline = informationCircleOutline;

        openLink(url: string) {
            window.open(url, '_blank');
        }
    }
</script>
<style lang="postcss">
    p a {
        @apply text-primary-600;
    }
</style>
