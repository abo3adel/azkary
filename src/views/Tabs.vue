<template>
    <ion-page>
        <ion-tabs>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="home" href="/tabs/home">
                    <ion-icon :icon="home" />
                </ion-tab-button>

                <ion-tab-button tab="zikr" href="/tabs/zikr">
                    <ion-icon src="/assets/icons/night-mode.svg" />
                </ion-tab-button>

                <ion-tab-button tab="du3a" href="/tabs/du3a">
                    <ion-icon src="/assets/icons/muslim-man-praying.svg" />
                </ion-tab-button>

                <ion-tab-button tab="sebha" href="/tabs/sebha">
                    <ion-icon src="/assets/icons/prayer-beads.svg" />
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts">
    import {
        IonTabBar,
        IonTabButton,
        IonTabs,
        IonIcon,
        IonPage,
    } from '@ionic/vue';
    import { triangle, home } from 'ionicons/icons';

    export default {
        name: 'Tabs',
        components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
        setup() {
            return {
                triangle,
                home,
            };
        },
    };
</script>
