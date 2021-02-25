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
        { id: 'primary', color: '#3880ff' },
        { id: 'secondary', color: '#3dc2ff' },
        { id: 'tertiary', color: '#5260ff' },
        { id: 'success', color: '#2dd36f' },
        { id: 'warning', color: '#ffc409' },
        { id: 'danger', color: '#eb445a' },
        { id: 'gold', color: '#daa520' },
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
