<template>
    <ion-page>
        <ion-toolbar>
            <ion-title><h3 class="hidden">a</h3></ion-title>
        </ion-toolbar>
        <ion-content>
            <ion-list>
                <!-- TODO add dark theme switcher -->
                <ion-item-group>
                    <ion-item-divider>
                        <ion-label>{{ $t('setup.app.size') }}</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-range
                            min=".9"
                            max="1.9"
                            step=".1"
                            color="primary"
                            :value="fontSize"
                            :key="fontSize"
                            @ionChange="fontSizeVal = $event.detail.value"
                            snaps
                        />
                        <ion-buttons slot="end">
                            <ion-button
                                color="primary"
                                @click.prevent="setFontSize"
                                fill="solid"
                            >
                                {{ $t('setup.app.save') }}
                            </ion-button>
                        </ion-buttons>
                    </ion-item>
                </ion-item-group>

                <ion-item-group>
                    <ion-item-divider>
                        <ion-label>{{ $t('setup.app.ftype') }}</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-select
                            v-model="fontType"
                            :ok-text="$t('sebha.del.okBtn')"
                            :cancel-text="$t('sebha.del.cancelBtn')"
                            :placeholder="$t('setup.app.ftype')"
                        >
                            <ion-select-option v-for="f in fontTypes" :key="f">
                                {{ f }}
                            </ion-select-option>
                        </ion-select>
                        <ion-buttons slot="end">
                            <ion-button
                                color="primary"
                                @click.prevent="setFontType"
                                fill="solid"
                            >
                                {{ $t('setup.app.save') }}
                            </ion-button>
                        </ion-buttons>
                    </ion-item>
                </ion-item-group>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import {
        IonPage,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonRange,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonItemDivider,
        IonItemGroup,
        IonSelect,
        IonSelectOption,
    } from '@ionic/vue';
    import loader from '@/utils/loader';
    import { UserEntity, Fonts, UserTheme } from '@/schema/UserEntity';
    import db from '@/utils/db';
    import toast from '@/utils/toast';

    export const FontTypes = ['Cairo', 'Roboto', 'Amiri', 'Uthmani', 'Times'];

    @Options({
        components: {
            IonPage,
            IonContent,
            IonList,
            IonItem,
            IonLabel,
            IonRange,
            IonToolbar,
            IonTitle,
            IonButtons,
            IonButton,
            IonItemDivider,
            IonItemGroup,
            IonSelect,
            IonSelectOption,
        },
    })
    export default class AppSettinges extends Vue {
        fontSize = 1.1;
        fontSizeVal = 1.1;
        fontType = Fonts.Base;
        theme = UserTheme.DevColored;
        dark = false;
        fontTypes = FontTypes;

        async loadAppSet() {
            await loader.show();

            const res = (
                await (await db())
                    .createQueryBuilder(UserEntity, 'user_set')
                    .select('fontSize, fontType, theme, dark')
                    .limit(1)
                    .execute()
            )[0];

            this.fontSize = res.fontSize;
            this.fontType = res.fontType;
            this.theme = res.theme;
            this.dark = res.dark;

            await loader.hide();
        }

        async setFontSize() {
            await loader.show();

            await (await db())
                .createQueryBuilder(UserEntity, 'user_set')
                .update()
                .set({ fontSize: this.fontSizeVal })
                .execute();

            await loader.hide();
            this.fontSize = this.fontSizeVal;
            toast(this.$t('setup.restart'));
        }

        async setFontType() {
            await loader.show();

            await (await db())
                .createQueryBuilder(UserEntity, 'user_set')
                .update()
                .set({ fontType: this.fontType })
                .execute();

            await loader.hide();
            toast(this.$t('setup.restart'));
        }

        mounted() {
            this.loadAppSet();
        }
    }
</script>
