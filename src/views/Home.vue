<template>
    <ion-toolbar>
        <ion-back-button></ion-back-button>
    </ion-toolbar>
    <ion-content :fullscreen="true">
       <h1>asdasdasd</h1>
    </ion-content>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import {
        IonToolbar,
        IonBackButton,
        IonContent,
    } from '@ionic/vue';
    // import seeder from '@/seeder';

    @Options({
        components: {
            IonToolbar,
            IonBackButton,
            IonContent,
        },
    })
    export default class Home extends Vue {
        page = 'PAGE';

        mounted() {
            // seeder.run().then(r => {
            //     console.clear();
            //     console.log('Done Seeded');
            // });
            console.log('at home');
        }
    }
</script>
