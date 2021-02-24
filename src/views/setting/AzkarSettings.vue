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
                    <ion-item color="primary">
                        <ion-label @click="bend">bend</ion-label>
                    </ion-item>
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
            const dt = DateTime.fromISO(this.night);
            console.log(dt.toFormat('hh:mm a'), dt.hour, dt.minute);

            LocalNotifications.schedule({
                notifications: [
                    {
                        title: this.$t('app_name'),
                        body: this.$t('azkar.night'),
                        id: 55,
                        schedule: {
                            every: 'hour',
                            on: {
                                minute: dt.minute,
                            },
                            // count: 5,
                        },
                    },
                    {
                        title: this.$t('app_name'),
                        body: this.$t('azkar.night2'),
                        id: 550,
                        schedule: {
                            at: new Date(Date.now() + 1000 * 5),
                            every: 'day',
                            on: {
                                hour: dt.hour,
                                minute: dt.minute,
                            },
                            // count: 5,
                        },
                    },
                ],
            });
        }

        async bend() {
            console.log(await LocalNotifications.getPending());
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
