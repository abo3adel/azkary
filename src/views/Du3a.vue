<template>
    <ion-toolbar>
        <ion-segment
            @ionChange="segmentChanged($event.detail)"
            :value="active"
            color="primary"
        >
            <ion-segment-button value="app">
                <ion-label>{{ $t('du3a.byApp') }}</ion-label>
            </ion-segment-button>
            <ion-segment-button value="user">
                <ion-label>{{ $t('du3a.byUser') }}</ion-label>
            </ion-segment-button>
        </ion-segment>
    </ion-toolbar>
    <ion-content class="ion-padding">
        <template v-for="du in ad3ia" :key="du.id">
            <ion-item
                v-if="active === 'user' ? du.byUser : !du.byUser"
                class="my-5 rounded-lg shadow-2xl"
                color="light"
            >
                <ion-label
                    class="font-semibold"
                    style="white-space: noraml;word-break: break-all;"
                >
                    {{ du.body }}
                </ion-label>
                <ion-toggle
                    @ionChange="update($event.detail)"
                    :value="du.id"
                    :checked="du.notifiable"
                    color="primary"
                ></ion-toggle>
            </ion-item>
        </template>
    </ion-content>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import {
        IonPage,
        IonToolbar,
        IonContent,
        IonSegment,
        IonSegmentButton,
        IonLabel,
        IonToggle,
        IonItem,
    } from '@ionic/vue';
    import db from '@/utils/db';
    import { Du3a } from '@/entities/Du3a';

    @Options({
        components: {
            IonPage,
            IonToolbar,
            IonContent,
            IonSegment,
            IonSegmentButton,
            IonLabel,
            IonToggle,
            IonItem,
        },
    })
    export default class Du3aView extends Vue {
        ad3ia: Du3a[] = [];
        active = 'user';
        toggles: HTMLDivElement[] = [];

        /**
         * load all ad3ia items
         */
        async loadAd3ia(): Promise<void> {
            const repo = (await db()).getRepository(Du3a);
            this.ad3ia = await repo.find();
        }

        segmentChanged(ev: { value: string }): void {
            this.active = ev.value;
        }

        async update(ev: { checked: boolean; value: string }): Promise<void> {
            await (await db())
                .createQueryBuilder(Du3a, 'ad3ia')
                .update()
                .set({ notifiable: ev.checked })
                .where({ id: ev.value })
                .execute();
        }

        beforeUpdate() {
            this.toggles = [];
        }

        mounted() {
            this.loadAd3ia();
        }
    }
</script>
