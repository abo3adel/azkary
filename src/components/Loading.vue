<template>
    <ion-loading
        :is-open="true"
        :message="$t('loaderTxt')"
        cssClass="ion-loader"
        duration="2000"
    >
    </ion-loading>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { IonLoading } from '@ionic/vue';

    export default defineComponent({
        components: { IonLoading },
        name: 'Loading',
    });
</script>
