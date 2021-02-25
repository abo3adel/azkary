<template>
    <ion-app>
        <ion-router-outlet />
    </ion-app>
</template>

<script lang="ts">
    import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import 'reflect-metadata';
    import { setStyles } from '@/common/styleApp';
    import { Plugins } from '@capacitor/core';
    import loader from './utils/loader';
    const { StatusBar } = Plugins;

    export const COLORES = [
        { id: 'primary-fall', color: '#2655a8', lighter: '#3880ff' },
        { id: 'secondary', color: '#2985af', lighter: '#3dc2ff' },
        { id: 'tertiary', color: '#2d37a3', lighter: '#5260ff' },
        { id: 'success', color: '#1d8f4a' , lighter: '#2dd36f'},
        { id: 'warning', color: '#9e7e16' , lighter: '#ffc409'},
        { id: 'danger', color: '#962534' , lighter: '#eb445a'},
        { id: 'gold', color: '#916c10' , lighter: '#daa520'},
    ];

    export default defineComponent({
        name: 'App',
        components: {
            IonApp,
            IonRouterOutlet,
        },
        inject: ['lang', 'dark', 'fontSize', 'fontType', 'theme'],
        async mounted() {
            await loader.show();

            // @ts-ignore
            this.$i18n.locale = this.lang;

            // @ts-ignore
            if (this.lang === 'ar') {
                document.documentElement.dir = 'rtl';
            }

            // @ts-ignore
            if (this.dark) {
                document.documentElement.classList.add('theme-dark');
            }

            setStyles(
                // @ts-ignore
                this.theme,
                // @ts-ignore
                this.fontType,
                // @ts-ignore
                this.fontSize
            );

            if (!isPlatform('hybrid')) return await loader.hide();

            // set statusbar background color
            StatusBar.setBackgroundColor({
                // @ts-ignore
                color: COLORES.filter((x) => x.id === this.theme)[0].color,
            });

            await loader.hide();
        },
    });
</script>
