<template>
    <ion-page>
        <ion-toolbar>
            <ion-segment
                @ionChange="segmentChanged($event.detail)"
                :value="active"
                color="primary"
                :swipe-gesture="true"
                class="shadow-lg"
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
                        style="white-space: normal;word-break: break-all;"
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
            <ion-fab
                vertical="bottom"
                horizontal="start"
                slot="fixed"
                @click.prevent="addNew"
                v-if="active === 'user'"
            >
                <ion-fab-button color="primary">
                    <ion-icon :icon="addOutline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
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
        IonFab,
        IonFabButton,
        IonIcon,
        alertController,
    } from '@ionic/vue';
    import { addOutline } from 'ionicons/icons';
    import db from '@/utils/db';
    import { NotifyZikr } from '@/entities/NotifyZikr';
    import toast from '@/utils/toast';
    import { getRepository } from 'typeorm';
    import loader from '@/utils/loader';
    import { NotifyZikrEntity } from '@/schema/NotifyZikrEntity';

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
            IonFab,
            IonFabButton,
            IonIcon,
        },
    })
    export default class Notify extends Vue {
        azkar: NotifyZikr[] = [];
        active = 'user';

        addOutline = addOutline;

        /**
         * load all azkar items
         */
        async loadData(): Promise<void> {
            const repo = (await db()).getRepository<NotifyZikr>('notify_zikr');
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
                .createQueryBuilder(NotifyZikrEntity, 'notifiable_azkars')
                .update()
                .set({ notifiable: ev.checked })
                .where({ id: ev.value })
                .execute();

            this.azkar[this.azkar.findIndex((x) => x.id === id)].notifiable =
                ev.checked;
        }

        async addNew(): Promise<void> {
            const alert = await alertController.create({
                cssClass: 'ion-alert',
                header: this.$t('zikr.add.header'),
                inputs: [
                    {
                        type: 'textarea',
                        name: 'body',
                        placeholder: 'سبحان الله وبحمده',
                        attributes: {
                            dir: 'rtl',
                        },
                    },
                ],
                buttons: [
                    {
                        text: this.$t('zikr.add.cancel'),
                        role: 'cancel',
                        cssClass: 'cancelBtn',
                    },
                    {
                        text: this.$t('zikr.add.save'),
                        cssClass: 'submitBtn',
                        handler: async (ev: {
                            body: string;
                        }): Promise<void> => {
                            if (!ev.body || !ev.body.length) {
                                toast(this.$t('zikr.err.noBody'));
                                return;
                            }

                            await loader.show();

                            const zikr = new NotifyZikr();
                            zikr.body = ev.body;
                            zikr.byUser = true;
                            zikr.notifiable = true;

                            this.azkar.push(
                                await getRepository(NotifyZikr).save(zikr)
                            );

                            await loader.hide();
                        },
                    },
                ],
            });
            await alert.present();
        }

        mounted() {
            this.loadData();
        }
    }
</script>
<style scoped>
    .segment-button-checked ion-label {
        background-color: var(--ion-color-primary, #3880ff);
        color: var(--ion-color-primary-contrast, #ffffff);
        padding: 0.5rem;
        border-radius: 6px;
    }
</style>
