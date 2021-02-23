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
                            {{ $t('setup.control.sound') }}
                        </ion-label>
                        <ion-toggle
                            @ionChange="
                                updateProp({ sound: $event.detail.checked })
                            "
                            :checked="sound"
                            color="primary"
                            :key="sound + Math.random()"
                        ></ion-toggle>
                    </ion-item>
                    <ion-item v-if="isHybird">
                        <ion-label>
                            {{ $t('setup.control.vibration') }}
                        </ion-label>
                        <ion-toggle
                            @ionChange="
                                updateProp({ vibration: $event.detail.checked })
                            "
                            :checked="vibration"
                            color="primary"
                            :key="vibration + Math.random()"
                        ></ion-toggle>
                    </ion-item>
                    <ion-item v-if="isHybird">
                        <ion-label>
                            {{ $t('setup.control.hardKeys') }}
                        </ion-label>
                        <ion-toggle
                            @ionChange="
                                updateProp({ hardKeys: $event.detail.checked })
                            "
                            :checked="hardKeys"
                            color="primary"
                            :key="hardKeys + Math.random()"
                        ></ion-toggle>
                    </ion-item>
                    <ion-item v-if="isHybird">
                        <ion-label>
                            {{ $t('setup.control.touch') }}
                        </ion-label>
                        <ion-toggle
                            @ionChange="
                                updateProp({ touch: $event.detail.checked })
                            "
                            :checked="touch"
                            color="primary"
                            :key="touch + Math.random()"
                        ></ion-toggle>
                    </ion-item>
                    <ion-item v-if="!isHybird">
                        <ion-label>
                            {{ $t('setup.control.keyboard') }}
                        </ion-label>
                        <ion-toggle
                            @ionChange="
                                updateProp({ keyboard: $event.detail.checked })
                            "
                            :checked="keyboard"
                            color="primary"
                            :key="keyboard + Math.random()"
                        ></ion-toggle>
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
        isPlatform,
    } from '@ionic/vue';
    import db from '@/utils/db';
    import { UserEntity } from '@/schema/UserEntity';
    import loader from '@/utils/loader';
    import toast from '@/utils/toast';

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
        },
    })
    export default class ControlSettings extends Vue {
        sound = false;
        vibration = true;
        hardKeys = false;
        touch = true;
        keyboard = true;
        isHybird = true;

        async loadControls() {
            await loader.show();

            const res = (
                await (await db())
                    .createQueryBuilder(UserEntity, 'userset')
                    .select('sound, vibration, hardKeys, touch, keyboard')
                    .execute()
            )[0];

            this.sound = res.sound;
            this.vibration = res.vibration;
            this.hardKeys = res.hardKeys;
            this.touch = res.touch;
            this.keyboard = res.keyboard;

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

        mounted() {
            console.log(this.$i18n.locale);
            
            this.isHybird = isPlatform('hybrid');
            this.loadControls();
        }
    }
</script>
