<template>
    <ion-page>
        <ion-toolbar color="primary" class="haveBg">
            <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>{{ $t('setup.title') }}</ion-title>
            <ion-icon :icon="cogOutline" slot="end" class="mx-2 text-5xl" />
        </ion-toolbar>
        <ion-split-pane content-id="main">
            <ion-content id="main">
                <ion-router-outlet />
            </ion-content>
            <ion-menu side="start" content-id="main">
                <ion-header>
                    <ion-toolbar color="primary">
                        <ion-title>Start Menu</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-content :fullscreen="true">
                    <div class="h-full">
                        <ion-list>
                            <ion-item href="/settings/azkar">
                                <ion-label>{{
                                    $t('setup.list.azkar')
                                }}</ion-label>
                                <ion-icon
                                    :icon="chevronForwardOutline"
                                    slot="end"
                                    :style="
                                        dir === 'ltr'
                                            ? ''
                                            : 'transform: rotate(180deg)'
                                    "
                                />
                            </ion-item>
                            <ion-item href="/settings/notify">
                                <ion-label>{{
                                    $t('setup.list.notify')
                                }}</ion-label>
                                <ion-icon
                                    :icon="chevronForwardOutline"
                                    slot="end"
                                    :style="
                                        dir === 'ltr'
                                            ? ''
                                            : 'transform: rotate(180deg)'
                                    "
                                />
                            </ion-item>
                            <ion-item href="/settings/sebha">
                                <ion-label>{{
                                    $t('setup.list.sebha')
                                }}</ion-label>
                                <ion-icon
                                    :icon="chevronForwardOutline"
                                    slot="end"
                                    :style="
                                        dir === 'ltr'
                                            ? ''
                                            : 'transform: rotate(180deg)'
                                    "
                                />
                            </ion-item>
                            <ion-item href="/settings/app">
                                <ion-label>{{
                                    $t('setup.list.app')
                                }}</ion-label>
                                <ion-icon
                                    :icon="chevronForwardOutline"
                                    slot="end"
                                    :style="
                                        dir === 'ltr'
                                            ? ''
                                            : 'transform: rotate(180deg)'
                                    "
                                />
                            </ion-item>
                        </ion-list>
                    </div>
                </ion-content>
            </ion-menu>
        </ion-split-pane>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import {
        IonPage,
        IonSplitPane,
        IonToolbar,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
        IonTitle,
        IonRouterOutlet,
        IonMenuButton,
        IonMenu,
        IonHeader,
        IonButtons,
        menuController,
    } from '@ionic/vue';

    import { chevronForwardOutline, cogOutline } from 'ionicons/icons';

    @Options({
        components: {
            IonPage,
            IonSplitPane,
            IonToolbar,
            IonContent,
            IonList,
            IonItem,
            IonLabel,
            IonIcon,
            IonTitle,
            IonRouterOutlet,
            IonMenuButton,
            IonMenu,
            IonHeader,
            IonButtons,
        },
    })
    export default class SettingIndex extends Vue {
        dir = 'rtl';

        chevronForwardOutline = chevronForwardOutline;
        cogOutline = cogOutline;

        beforeMount() {
            this.dir = document.documentElement.dir;
        }

        mounted() {
            console.log(document.documentElement.dir);
        }
    }
</script>
