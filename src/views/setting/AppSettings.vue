<template>
    <ion-page>
        <ion-toolbar>
            <ion-title><h3 class="hidden">a</h3></ion-title>
        </ion-toolbar>
        <ion-content>
            <ion-list>
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
                            :interface-options="{
                                cssClass: 'fontType ion-alert',
                            }"
                            v-model="fontType"
                            :ok-text="$t('sebha.del.okBtn')"
                            :cancel-text="$t('sebha.del.cancelBtn')"
                            :placeholder="$t('setup.app.ftype')"
                            :style="`font-family: '${fontType}'`"
                        >
                            <ion-select-option
                                v-for="f in fontTypes"
                                :key="f"
                                :class="f"
                                :value="f"
                            >
                                سبحان الله
                            </ion-select-option>
                        </ion-select>
                        <ion-buttons slot="end">
                            <ion-button
                                color="primary"
                                @click.prevent="updateProp({ fontType })"
                                fill="solid"
                            >
                                {{ $t('setup.app.save') }}
                            </ion-button>
                        </ion-buttons>
                    </ion-item>
                </ion-item-group>

                <ion-item-group>
                    <ion-item-divider>
                        <ion-label>{{ $t('setup.app.azkarFont') }}</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-select
                            :interface-options="{
                                cssClass: 'fontType ion-alert',
                            }"
                            v-model="azkarFont"
                            :ok-text="$t('sebha.del.okBtn')"
                            :cancel-text="$t('sebha.del.cancelBtn')"
                            :placeholder="$t('setup.app.ftype')"
                            :style="`font-family: '${azkarFont}'`"
                        >
                            <ion-select-option
                                v-for="f in azkarFonts"
                                :key="f"
                                :class="f"
                                :value="f"
                            >
                                ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                            </ion-select-option>
                        </ion-select>
                        <ion-buttons slot="end">
                            <ion-button
                                color="primary"
                                @click.prevent="updateProp({ azkarFont })"
                                fill="solid"
                            >
                                {{ $t('setup.app.save') }}
                            </ion-button>
                        </ion-buttons>
                    </ion-item>
                </ion-item-group>

                <ion-item-group>
                    <ion-item-divider>
                        <ion-label>{{ $t('setup.app.look') }}</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-select
                            v-model="theme"
                            :interface-options="{
                                cssClass: 'fontType ion-alert',
                            }"
                            :ok-text="$t('sebha.del.okBtn')"
                            :cancel-text="$t('sebha.del.cancelBtn')"
                            :placeholder="$t('setup.app.ftype')"
                            :style="
                                `background-color: var(--ion-color-${theme})`
                            "
                        >
                            <ion-select-option
                                v-for="c in colors"
                                :key="c + Math.random()"
                                :class="c"
                                :value="c"
                            >
                            </ion-select-option>
                        </ion-select>
                        <ion-buttons slot="end">
                            <ion-button
                                color="primary"
                                @click.prevent="updateProp({ theme })"
                                fill="solid"
                            >
                                {{ $t('setup.app.save') }}
                            </ion-button>
                        </ion-buttons>
                    </ion-item>

                    <ion-item>
                        <ion-label>
                            {{ $t('setup.app.dark') }}
                        </ion-label>
                        <ion-toggle
                            @ionChange="
                                updateProp({ dark: $event.detail.checked })
                            "
                            :checked="dark"
                            color="primary"
                            :key="dark + Math.random()"
                        ></ion-toggle>
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
        IonToggle,
    } from '@ionic/vue';
    import loader from '@/utils/loader';
    import { UserEntity, Fonts, UserTheme } from '@/schema/UserEntity';
    import db from '@/utils/db';
    import toast from '@/utils/toast';

    export const FontTypes = [
        Fonts.Base,
        Fonts.Amiri,
        Fonts.Hafs,
        Fonts.Tajawal,
        Fonts.Mirza,
        Fonts.Ruqaa,
    ];

    export const ThemeColors = [
        // order by variables.css
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'danger',
        'gold',
    ];

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
            IonToggle,
        },
    })
    export default class AppSettinges extends Vue {
        fontSize = 1.1;
        fontSizeVal = 1.1;
        fontType = Fonts.Base;
        azkarFont = Fonts.Amiri;
        theme = ThemeColors[0]; // primary as defualt
        dark = false;
        fontTypes = FontTypes;
        azkarFonts = [Fonts.Amiri, Fonts.Hafs, Fonts.Mirza, Fonts.Ruqaa];
        colors = ThemeColors;

        async loadAppSet() {
            await loader.show();

            const res = (
                await (await db())
                    .createQueryBuilder(UserEntity, 'user_set')
                    .select('fontSize, fontType, azkarFont, theme, dark')
                    .limit(1)
                    .execute()
            )[0];

            this.fontSize = res.fontSize;
            this.fontType = res.fontType;
            this.azkarFont = res.azkarFont;
            this.theme = res.theme;
            this.dark = res.dark;

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

        async setFontSize() {
            await this.updateProp({ fontSize: this.fontSizeVal });
            this.fontSize = this.fontSizeVal;
        }

        mounted() {
            this.loadAppSet();
        }
    }
</script>
<style lang="postcss">
    .fontType {
        .alert-radio-group {
            max-height: 100%;
        }
        .select-interface-option {
            .alert-radio-label {
                font-size: 1.4rem;
            }
        }
        /* font family picker */
        .Cairo {
            font-family: 'Cairo';
        }
        .AmiriQuranColored {
            font-family: 'AmiriQuranColored';
        }
        .UthmanicHafs-Ver16 {
            font-family: 'UthmanicHafs-Ver16';
        }
        .Tajawal-Regular {
            font-family: 'Tajawal-Regular';
        }
        .Mirza-Regular {
            font-family: 'Mirza-Regular';
        }
        .ArefRuqaa-Regular {
            font-family: 'ArefRuqaa-Regular';
        }

        /* color picker */
        .primary {
            background: var(--ion-color-primary);
        }
        .secondary {
            background: var(--ion-color-secondary);
        }
        .tertiary {
            background: var(--ion-color-tertiary);
        }
        .success {
            background: var(--ion-color-success);
        }
        .warning {
            background: var(--ion-color-warning);
        }
        .danger {
            background: var(--ion-color-danger);
        }
        .gold {
            background: var(--ion-color-gold);
        }
    }
</style>
