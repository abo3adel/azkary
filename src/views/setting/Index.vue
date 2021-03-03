<template>
    <ion-page>
        <ion-toolbar color="primary">
            <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title> {{ $t('setup.title') }}</ion-title>
            <ion-buttons slot="end">
                <ion-button @click.prevent="goTo('/tabs/home')">
                    <ion-icon :icon="home" />
                </ion-button>
            </ion-buttons>
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
                            <ion-item
                                @click.prevent="goTo('/settings/app')"
                                class="hover:cursor-pointer item"
                            >
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
                            <ion-item
                                @click.prevent="goTo('/settings/control')"
                                class="hover:cursor-pointer item"
                            >
                                <ion-label>{{
                                    $t('setup.list.control')
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
                            <ion-item
                                @click.prevent="goTo('/settings/azkar')"
                                class="hover:cursor-pointer item"
                            >
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
                            <ion-item
                                @click.prevent="goTo('/settings/sebha')"
                                class="hover:cursor-pointer item"
                            >
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
        IonButton,
        menuController,
    } from '@ionic/vue';

    import { chevronForwardOutline, cogOutline, home } from 'ionicons/icons';

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
            IonButton,
        },
    })
    export default class SettingIndex extends Vue {
        dir = 'rtl';

        chevronForwardOutline = chevronForwardOutline;
        cogOutline = cogOutline;
        home = home;

        async goTo(page: string) {
            this.$router.replace(page);
            await menuController.close();
        }

        beforeMount() {
            this.dir = document.documentElement.dir;
        }

        mounted() {
            console.log(document.documentElement.dir);
        }
    }
</script>
<style lang="postcss" scoped>
    ion-item.item:hover {
        --background: rgb(203, 213, 225);
    }
    .theme-dark ion-item.item:hover {
        --background: rgb(51, 65, 85);
    }
</style>
