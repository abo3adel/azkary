<template>
    <ion-toolbar>
        <ion-back-button>asdsad</ion-back-button>
    </ion-toolbar>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import { CategoryFactory } from '../../database/factory/CategoryFactory';

@Options({})
export default class Home extends Vue
{
    page = 'PAGE';
    mounted() {
        // CategoryFactory.with(5).count(7).create();
    }
}
</script>