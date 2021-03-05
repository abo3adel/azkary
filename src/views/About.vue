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
                    src="/assets/icon/android-chrome-256x256.png"
                    class="object-cover w-full h-full"
                />
            </div>
            <h1 class="mt-3 text-3xl">
                {{ $t('app.slideName') }}
            </h1>
            <hr class="w-1/4 mx-auto my-6 border border-gray-700" />
            <h3 class="text-2xl">{{ $t('app.download') }}</h3>
            <p class="mt-4 text-lg">
                {{ $t('app.slide.pcMess') }}
            </p>
            <ion-button
                color="primary"
                @click.prevent="openLink('http://abo3adel.github.io')"
                class="mt-3"
            >
                {{ $t('app.slide.pcCopy') }}
            </ion-button>
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
                <hr class="w-1/2 my-1 border border-gray-500" />
                <p>
                    Made with <span class="text-red-500">&hearts;</span> by
                    <a href="http://abo3adel.github.io/" target="_blank"
                        >TheNinjaCoder</a
                    >
                </p>
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
