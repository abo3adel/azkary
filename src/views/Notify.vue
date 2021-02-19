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
        <template v-for="du in azkar" :key="du.id">
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
                    @ionChange="update($event.detail, du.id)"
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
    import { NotifyZikr } from '@/entities/NotifyZikr';

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
    export default class Notify extends Vue {
        azkar: NotifyZikr[] = [];
        active = 'user';
        toggles: HTMLDivElement[] = [];

        /**
         * load all azkar items
         */
        async loadData(): Promise<void> {
            const repo = (await db()).getRepository(NotifyZikr);
            this.azkar = await repo.find();
        }

        segmentChanged(ev: { value: string }): void {
            this.active = ev.value;
        }

        async update(
            ev: { checked: boolean; value: string },
            id: number
        ): Promise<void> {
            await (await db())
                .createQueryBuilder(NotifyZikr, 'notifiable_azkars')
                .update()
                .set({ notifiable: ev.checked })
                .where({ id: ev.value })
                .execute();

            this.azkar[this.azkar.findIndex((x) => x.id === id)].notifiable =
                ev.checked;
        }

        beforeUpdate() {
            this.toggles = [];
        }

        mounted() {
            this.loadData();
        }
    }
</script>
