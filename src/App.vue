<template>
    <ion-app>
        <ion-router-outlet />
    </ion-app>
</template>

<script lang="ts">
    import { IonApp, IonRouterOutlet } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import 'reflect-metadata';
    import { setStyles } from '@/common/styleApp';

    export default defineComponent({
        name: 'App',
        components: {
            IonApp,
            IonRouterOutlet,
        },
        inject: ['lang', 'dark', 'fontSize', 'fontType', 'theme'],
        mounted() {
            // @ts-ignore
            this.$i18n.locale = this.lang;

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
        },
    });
</script>
