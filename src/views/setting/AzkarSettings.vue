<template>
    <ion-page>
        <ion-toolbar>
            <ion-title><h3 class="hidden">a</h3></ion-title>
        </ion-toolbar>
        <ion-content class="ion-padding">
            <div>
                <ion-list>
                    <ion-item>
                        <ion-label>
                            {{ $t('setup.azkar.enable') }}
                        </ion-label>
                        <ion-toggle
                            @ionChange="
                                updateProp({ enabled: $event.detail.checked })
                            "
                            :checked="enabled"
                            color="primary"
                            :key="enabled + Math.random()"
                        ></ion-toggle>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            {{ $t('setup.azkar.autoHide') }}
                        </ion-label>
                        <ion-toggle
                            @ionChange="
                                updateProp({ autoHide: $event.detail.checked })
                            "
                            :checked="autoHide"
                            color="primary"
                            :key="autoHide + Math.random()"
                        ></ion-toggle>
                    </ion-item>
                    <ion-item-group>
                        <ion-item-divider>
                            <ion-label>{{ $t('setup.azkar.times') }}</ion-label>
                        </ion-item-divider>
                        <ion-item>
                            <ion-label>
                                {{ $t('setup.azkar.morning') }}
                            </ion-label>
                            <ion-datetime
                                display-format="hh:mm a"
                                picker-format="HH:mm a"
                                min="04:00"
                                max="13:00"
                                :cancel-text="$t('zikr.del.cancelBtn')"
                                :done-text="$t('zikr.del.okBtn')"
                                v-model="morning"
                                @ionChange="
                                    updateProp({ morning: $event.detail.value })
                                "
                            />
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                {{ $t('setup.azkar.night') }}
                            </ion-label>
                            <ion-datetime
                                display-format="hh:mm a"
                                picker-format="HH:mm a"
                                min="16:00"
                                max="20:00"
                                :cancel-text="$t('zikr.del.cancelBtn')"
                                :done-text="$t('zikr.del.okBtn')"
                                v-model="night"
                                @ionChange="saveNight"
                            />
                        </ion-item>
                    </ion-item-group>
                    <ion-item-group>
                        <ion-item-divider>
                            <ion-label>{{
                                $t('setup.azkar.notifyCount')
                            }}</ion-label>
                        </ion-item-divider>
                        <ion-item>
                            <ion-select
                                interface="popover"
                                :interface-options="{
                                    cssClass: 'fontType ion-alert',
                                }"
                                v-model="notifyCount"
                                :cancel-text="$t('zikr.del.cancelBtn')"
                                :ok-text="$t('zikr.del.okBtn')"
                                :placeholder="$t('setup.azkar.perDay')"
                            >
                                <ion-select-option
                                    v-for="f in Array(24)
                                        .fill(0)
                                        .map((x, i) => (x += i))"
                                    :key="f"
                                    :value="f"
                                >
                                    {{ f }}
                                </ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-item-group>
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import {
        IonPage,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonToggle,
        IonItemGroup,
        IonItemDivider,
        IonDatetime,
        IonSelect,
        IonSelectOption,
    } from '@ionic/vue';
    import loader from '@/utils/loader';
    import { UserEntity } from '@/schema/UserEntity';
    import db from '@/utils/db';
    import toast from '@/utils/toast';
    import { DateTime } from 'luxon';

    // import {
    //     LocalNotifications as cordoveLN,
    //     ELocalNotificationTriggerUnit,
    // } from '@ionic-native/local-notifications';

    import { Plugins } from '@capacitor/core';
    const { LocalNotifications, Storage } = Plugins;

    @Options({
        components: {
            IonPage,
            IonToolbar,
            IonTitle,
            IonContent,
            IonList,
            IonItem,
            IonLabel,
            IonToggle,
            IonItemGroup,
            IonItemDivider,
            IonDatetime,
            IonSelect,
            IonSelectOption,
        },
    })
    export default class AzkarSettings extends Vue {
        enabled = true;
        autoHide = true;
        morning = '2021-02-22T06:30:46.789';
        night = '2021-02-22T17:30:46.789';
        notifyCount = 13;

        async loadAzkarSet() {
            await loader.show();

            const res = (
                await (await db())
                    .createQueryBuilder(UserEntity, 'userset')
                    .select('enabled, morning, night, notifyCount, autoHide')
                    .execute()
            )[0];

            this.enabled = res.enabled;
            this.morning = res.morning;
            this.night = res.night;
            this.notifyCount = res.notifyCount;
            this.autoHide = res.autoHide;

            await loader.hide();
        }

        async updateProp(prop: object) {
            await loader.show();

            await (await db())
                .createQueryBuilder(UserEntity, 'user_set')
                .update()
                .set(prop)
                .execute();

            await loader.hide();
            toast(this.$t('setup.restart'));
        }

        async saveNight(ev: { detail: { value: string } }) {
            // LocalNotifications.schedule({
            //     title: 'asdsadsad ' + Math.random(),
            //     text: 'from ---- to',
            //     trigger: { in: 2, unit: ELocalNotificationTriggerUnit.MINUTE },
            //     actions: [
            //         { id: 'yes', title: 'Yes' },
            //         { id: 'no', title: 'No' },
            //     ],
            // });
            // console.log(await LocalNotifications.getAll());
            // if (this.night === ev.detail.value) return;
            // await this.updateProp({ night: ev.detail.value });
            const notifs = await LocalNotifications.schedule({
                notifications: [
                    {
                        title: 'Title',
                        body: 'Body' + Math.random(),
                        id: Math.round(Math.random() * 200),
                        schedule: { every: 'minute' },
                        actionTypeId: '',
                        extra: null,
                    },
                ],
            });
            console.log('scheduled notifications', notifs);
            const pend = await LocalNotifications.getPending();
            console.log(pend);

            // console.log(await LocalNotifications.cancel(pend));

            LocalNotifications.addListener(
                'localNotificationReceived',
                async (ev: any) => {
                    console.log('kjgghjghjg bnvghf');

                    console.log(ev);
                    await Storage.set({
                        key: 'notified',
                        value: JSON.stringify(ev),
                    });
                }
            );

            LocalNotifications.addListener(
                'localNotificationActionPerformed',
                async (ev: any) => {
                    console.log('kjgghjghjg bnvghf');

                    console.log(ev);
                    await Storage.set({
                        key: 'notified2',
                        value: JSON.stringify(ev),
                    });
                }
            );
        }

        updateDateTime(ev: any) {
            console.log(this.morning, ev.detail);
            const dt = DateTime.fromISO(this.morning);
            console.log(dt.toFormat('hh:mm a'));
        }

        mounted() {
            this.loadAzkarSet();
        }
    }
</script>
<style lang="postcss">
    .fontType {
        .alert-radio-group {
            max-height: 100%;
            over-flow: auto;
        }
    }
</style>
