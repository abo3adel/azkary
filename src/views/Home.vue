<template>
    <ion-toolbar>
        <ion-back-button>asdsad</ion-back-button>
    </ion-toolbar>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import seeder from '@/seeder';

@Options({})
export default class Home extends Vue
{
    page = 'PAGE';
    mounted() {
        // seeder.run().then(r => {
        //     console.clear();
        //     console.log('Done Seeded');
        // });
    }
}
</script>