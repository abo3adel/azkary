<template>
    <ion-page>
        <ion-toolbar>
            <ion-title><h3 class="hidden">a</h3></ion-title>
        </ion-toolbar>
        <ion-content class="ion-padding">
            <div class="">
                <ion-list>
                    <ion-item>
                        <ion-label>
                            {{ $t('setup.sebha.auto') }}
                        </ion-label>
                        <ion-toggle
                            @ionChange="updateAutoNext($event.detail)"
                            :checked="autoNext"
                            color="primary"
                            :key="autoNext + Math.random()"
                        ></ion-toggle>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            {{ $t('setup.sebha.bg') }}
                        </ion-label>
                        <ion-buttons slot="end">
                            <ion-button
                                color="primary"
                                @click="
                                    platform === 'hybird'
                                        ? uploadFromHybird($event)
                                        : null
                                "
                            >
                                <ion-icon
                                    class="mx-1"
                                    :icon="cloudUploadOutline"
                                />
                                <label for="myImg" class="w-full">
                                    {{ $t('setup.sebha.chooseBg') }}
                                </label>

                                <input
                                    id="myImg"
                                    type="file"
                                    name="image"
                                    @change="uploadFromDescTop"
                                    style="display: none;"
                                    v-if="platform !== 'hybird'"
                                />
                            </ion-button>
                        </ion-buttons>
                    </ion-item>
                </ion-list>
                <div class="w-11/12 mx-auto">
                    <img
                        v-show="img.length"
                        :src="img"
                        class="object-cover w-full rounded-lg shadow-lg"
                        alt="sebha background image"
                    />
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import db from '@/utils/db';
    import {
        IonToolbar,
        IonBackButton,
        IonPage,
        IonHeader,
        IonContent,
        IonButtons,
        IonList,
        IonItem,
        IonButton,
        IonRippleEffect,
        IonIcon,
        IonTitle,
        IonInput,
        IonToggle,
        IonLabel,
        isPlatform,
    } from '@ionic/vue';

    import { cloudUploadOutline } from 'ionicons/icons';

    import { UserEntity } from '@/schema/UserEntity';
    import loader from '@/utils/loader';

    import { Plugins, FilesystemEncoding } from '@capacitor/core';
    import { FileChooser } from '@ionic-native/file-chooser';
    import { DEFUALT_BG } from '../Sebha.vue';
    const { Storage, Filesystem } = Plugins;

    const convertBlobToBase64 = (blob: any) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });

    @Options({
        components: {
            IonToolbar,
            IonBackButton,
            IonPage,
            IonHeader,
            IonContent,
            IonButtons,
            IonList,
            IonItem,
            IonButton,
            IonRippleEffect,
            IonIcon,
            IonTitle,
            IonInput,
            IonToggle,
            IonLabel,
        },
    })
    export default class SebhaSettings extends Vue {
        img = '';
        autoNext = true;
        platform = 'hybird';

        cloudUploadOutline = cloudUploadOutline;

        async loadSebhaSettings() {
            await loader.show();
            const res = await (await db())
                .createQueryBuilder(UserEntity, 'user_set')
                .select('sebhaAutoNext')
                .execute();

            // console.log(res[0], res[0]?.sebhaAutoNext);

            this.autoNext = res[0]?.sebhaAutoNext as boolean;

            // console.log(this.autoNext);

            this.img =
                (await Storage.get({ key: 'sebha_img' })).value ?? DEFUALT_BG;

            await loader.hide();
        }

        async uploadFromHybird(ev: any) {
            const r = (await FileChooser.open().catch((err: any) =>
                console.log(err)
            )) as string;

            const contents = await (
                await Filesystem.readFile({
                    path: r as string,
                    encoding: FilesystemEncoding.UTF8,
                })
            ).data;

            // console.log(
            //     contents,
            //     contents.toString(),
            //     convertBlobToBase64(contents)
            // );

            this.saveImage((await convertBlobToBase64(contents)) as string);
        }

        async uploadFromDescTop(ev: any) {
            // id user did not select any image
            if (!ev.target.files || !ev.target.files.length) return;

            await loader.show();
            const base64 = (await convertBlobToBase64(
                ev.target.files[0]
            )) as string;
            this.img = base64;
            this.saveImage(base64);
            await loader.hide();
        }

        async saveImage(base64: string) {
            if (!base64) return;
            return await Storage.set({
                key: 'sebha_img',
                value: base64,
            });
        }

        async updateAutoNext(ev: { checked: boolean }) {
            // console.log(this.autoNext, 'from upad');

            await loader.show();

            await (await db())
                .createQueryBuilder(UserEntity, 'user_set')
                .update()
                .set({ sebhaAutoNext: ev.checked })
                .execute();

            await loader.hide();

            this.autoNext = ev.checked;
        }

        mounted() {
            this.loadSebhaSettings();

            if (isPlatform('desktop')) {
                this.platform = 'desctop';
            }
        }
    }
</script>
