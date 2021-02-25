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
                            @ionChange="setEnabled($event.detail.checked)"
                            :checked="enabled"
                            color="primary"
                            :key="enabled + Math.random()"
                        ></ion-toggle>
                    </ion-item>
                    <!-- <ion-item>
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
                    </ion-item> -->
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
                                    addNotification(
                                        1,
                                        this.$t('azkar.morningTime'),
                                        $event.detail.value,
                                        'morning'
                                    )
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
                                @ionChange="
                                    addNotification(
                                        2,
                                        this.$t('azkar.nightTime'),
                                        $event.detail.value,
                                        'night'
                                    )
                                "
                            />
                        </ion-item>
                    </ion-item-group>
                    <ion-item-group>
                        <ion-item-divider>
                            <ion-label>{{
                                $t('setup.azkar.notifyAzkar')
                            }}</ion-label>
                        </ion-item-divider>
                        <ion-item>
                            <ion-label>{{
                                $t('setup.azkar.countDay')
                            }}</ion-label>
                            <ion-select
                                slot="end"
                                interface="popover"
                                :interface-options="{
                                    cssClass: 'fontType ion-alert',
                                }"
                                v-model="notifyCount"
                                :cancel-text="$t('zikr.del.cancelBtn')"
                                :ok-text="$t('zikr.del.okBtn')"
                                :placeholder="notifyCount"
                                @ionChange="setNotifyCount($event.detail.value)"
                            >
                                <ion-select-option
                                    v-for="f in Array(24)
                                        .fill(1)
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
    import { UserEntity, User } from '@/schema/UserEntity';
    import db from '@/utils/db';
    import toast from '@/utils/toast';
    import { DateTime } from 'luxon';

    import {
        Plugins,
        LocalNotificationActionPerformed,
        LocalNotification,
    } from '@capacitor/core';
    import { NotifyZikrEntity, NotifyZikr } from '@/schema/NotifyZikrEntity';
    const { LocalNotifications } = Plugins;

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

        async setEnabled(val: boolean) {
            this.enabled = val;

            await this.updateProp({ enabled: val }, false);

            if (!this.enabled) {
                // delete all scheduled notifications
                return await LocalNotifications.cancel(
                    await LocalNotifications.getPending()
                );
            }

            // re schedule all azkar
            await this.addNotification(
                1,
                this.$t('azkar.morningTime'),
                this.morning,
                'morning'
            );
            await this.addNotification(
                2,
                this.$t('azkar.nightTime'),
                this.night,
                'night'
            );

            await this.setNotifyCount(this.notifyCount);
        }

        async updateProp(prop: object, spinner = true) {
            if (spinner) await loader.show();

            await (await db())
                .createQueryBuilder(UserEntity, 'user_set')
                .update()
                .set(prop)
                .execute();

            if (spinner) await loader.hide();
        }

        checkIsEnabled(): boolean {
            if (this.enabled) return false;
            toast(this.$t('setup.azkar.notEnabled'));
            return true;
        }

        async addNotification(
            id: number,
            body: string,
            iso: string,
            prop: string
        ) {
            if (this.checkIsEnabled()) return;

            await loader.show();

            const dt = DateTime.fromISO(iso);

            // save to db
            await this.updateProp({ [prop]: iso }, false);

            // delete old
            await LocalNotifications.cancel({
                notifications: [{ id: `${id}` }],
            });

            await LocalNotifications.schedule({
                notifications: [
                    {
                        id,
                        title: this.$t('app.name'),
                        body,
                        schedule: {
                            on: {
                                hour: dt.hour,
                                minute: dt.minute,
                            },
                        },
                    },
                ],
            });            

            await loader.hide();
        }

        async setNotifyCount(val: number) {
            if (this.checkIsEnabled()) return;

            await loader.show();
            await this.updateProp({ notifyCount: val });

            // delete old
            // all notification azkar ids is more than 100
            const old = (await LocalNotifications.getPending()).notifications;
            await LocalNotifications.cancel({
                notifications: old.filter((x) => parseInt(x.id) > 10),
            });

            const azkar = (await (await db())
                .createQueryBuilder<NotifyZikr>(
                    NotifyZikrEntity,
                    'azkar_notify'
                )
                .select('body')
                .where({ notifiable: true })
                .orderBy('RANDOM()')
                .limit(val)
                .execute()) as NotifyZikr[];

            const notifications: LocalNotification[] = [];
            const appName = this.$t('app.name');
            const at = 24 / val;

            for (let x = 0; x < val; x++) {
                let azkarInx = x < azkar.length - 1 ? x : 0;
                const dt = DateTime.now()
                    .set({ hour: 12 })
                    .plus({ hours: at * x });
                notifications.push({
                    // more than 100 is azkar notifications
                    id: Math.round(Math.random() * 1000) + x,
                    title: appName,
                    body: azkar[azkarInx].body,
                    schedule: {
                        on: {
                            day: dt.day,
                            hour: dt.hour,
                        },
                    },
                });
                azkarInx++;
            }

            await LocalNotifications.schedule({ notifications });
            await loader.hide();
        }

        updateDateTime(ev: any) {
            console.log(this.morning, ev.detail);
            const dt = DateTime.fromISO(this.morning);
            console.log(dt.toFormat('hh:mm a'));
        }

        mounted() {
            this.loadAzkarSet();

            // TODO test on real device
            // open azkar page if clicked
            LocalNotifications.addListener(
                'localNotificationActionPerformed',
                async (ev: LocalNotificationActionPerformed) => {
                    console.log(ev);

                    if (parseInt(ev.actionId) === 1) {
                        // morning
                        this.$router.replace('/zikr/morning');
                    } else if (parseInt(ev.actionId) === 2) {
                        // night
                        this.$router.replace('/zikr/night');
                    }
                }
            );
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
