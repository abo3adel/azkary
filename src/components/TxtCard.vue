<template>
    <div
        class="w-11/12 mx-auto bg-gray-200 rounded-md shadow-lg card dark:bg-gray-700"
        :class="cls"
        style="background-color: var(--ion-item-background)"
    >
        <div
            class="flex rounded-md rounded-bl-none rounded-br-none bg-primary-600 text-color"
        >
            <h5 class="w-2/3 px-2 text-lg text-left header rtl:text-right">
                {{ title }}
            </h5>
            <div class="w-1/3 text-left">
                <ion-buttons class="justify-end">
                    <ion-button
                        type="button"
                        :disabled="!ar"
                        @click.prevent="shareIt"
                    >
                        <ion-icon slot="start" :icon="shareSocialOutline" />
                        <ion-label class="hidden sm:inline-block">
                            {{ $t('home.btn.share') }}
                        </ion-label>
                    </ion-button>
                    <ion-button type="button" v-show="!disableEn" @click.prevent="!disableEn ? showEn = !showEn : null">
                        <ion-icon slot="start" :icon="language" />
                        <ion-label class="hidden sm:inline-block">
                            {{ $t('home.btn.trans') }}
                        </ion-label>
                    </ion-button>
                </ion-buttons>
            </div>
        </div>
        <div class="p-2">
            <div class="text-right" :style="sty">
                <p
                    class="w-11/12 mx-auto font-semibold text-center text-red-600"
                    v-if="error.ar"
                >
                    <ion-icon
                        slot="start"
                        :icon="alertCircleOutline"
                        class="align-middle"
                    />
                    {{ $t('home.errNet') }}
                </p>
                <p v-else>
                    <span v-if="ar.length || !loading" dir="rtl">
                        {{ ar }}
                    </span>
                    <span v-else>
                        <ion-spinner
                            class="w-11/12 mx-auto"
                            name="crescent"
                            color="primary"
                        ></ion-spinner>
                    </span>
                </p>
                <slot name="meta" v-if="ar" />
            </div>
            <hr class="w-1/2 my-3 border border-gray-400" v-if="showEn" />
            <div class="text-lg text-left" v-if="showEn">
                <p
                    class="w-11/12 mx-auto font-semibold text-center text-red-600"
                    v-if="error.en"
                >
                    <ion-icon
                        slot="start"
                        :icon="alertCircleOutline"
                        class="align-middle"
                    />
                    {{ $t('home.errNet') }}
                </p>
                <p v-else>
                    <span v-if="en.length || !loading" dir="ltr">
                        {{ en }}
                    </span>
                    <span v-else>
                        <ion-spinner
                            class="w-11/12 mx-auto"
                            name="crescent"
                            color="primary"
                        ></ion-spinner>
                    </span>
                </p>
                <slot name="meta-en" v-if="en" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Options, Vue, prop } from 'vue-class-component';
    import {
        IonButtons,
        IonButton,
        IonLabel,
        IonSpinner,
        IonIcon,
    } from '@ionic/vue';
    import {
        shareSocialOutline,
        language,
        alertCircleOutline,
    } from 'ionicons/icons';
    import share from '@/utils/share';

    class Props {
        cls = prop<string>({ default: 'pt-3' });
        title = prop<string>({ default: '' });
        sty = prop<string>({ default: '' });
        ar = prop<string>({ default: '' });
        en = prop<string>({ default: '' });
        disableEn = prop<boolean>({default: false});
        error = prop<{
            ar: boolean | string;
            en: boolean | string;
        }>({
            default: {
                ar: false,
                en: false,
            },
        });
    }

    @Options({
        components: { IonButtons, IonButton, IonLabel, IonSpinner, IonIcon },
        inject: ['lang'],
    })
    export default class TxtCard extends Vue.with(Props) {
        loading = true;
        showEn = false;

        shareSocialOutline = shareSocialOutline;
        language = language;
        alertCircleOutline = alertCircleOutline;

        shareIt() {
            if (!this.ar) return;

            share(this, this.ar, this.$t('home.btn.share'));
        }

        async mounted() {
            // const net = await Network.getStatus();
            // if (!net.connected) {
            //     this.error = { ar: true, en: true };
            // }
            // this.loading = false;
        }
    }
</script>
