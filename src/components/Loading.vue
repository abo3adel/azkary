<template>
    <ion-loading
        :is-open="true"
        :message="$t('loderTxt')"
        cssClass="ion-loader"
        duration="5000"
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
