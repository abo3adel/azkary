<template>
    <ion-page>
        <ion-toolbar>
            <ion-title><h3 class="hidden">a</h3></ion-title>
        </ion-toolbar>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label>
                        {{ $t('setup.app.lang') }}
                    </ion-label>
                    <ion-select
                        interface="popover"
                        :interface-options="{
                            cssClass: 'fontType ion-alert',
                        }"
                        v-model="lang"
                        :placeholder="$t('setup.app.lang')"
                        @ionChange="updateProp({ lang }, true)"
                    >
                        <ion-select-option value="ar">
                            العربية
                        </ion-select-option>
                        <ion-select-option value="en">
                            English
                        </ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item-group>
                    <ion-item-divider>
                        <ion-label>{{ $t('setup.app.size') }}</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-range
                            min=".9"
                            max="1.3"
                            step=".05"
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
                        <ion-label>{{ $t('setup.app.font') }}</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-label>{{ $t('setup.app.ftype') }}</ion-label>
                        <ion-select
                            :interface-options="{
                                cssClass: 'fontType ion-alert',
                            }"
                            v-model="fontType"
                            slot="end"
                            :ok-text="$t('zikr.del.okBtn')"
                            :cancel-text="$t('zikr.del.cancelBtn')"
                            :placeholder="$t('setup.app.ftype')"
                            :style="`font-family: '${fontType}'`"
                            @ionChange="updateProp({ fontType })"
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
                    </ion-item>

                    <ion-item>
                        <ion-label>{{ $t('setup.app.azkarFont') }}</ion-label>
                        <ion-select
                            :interface-options="{
                                cssClass: 'fontType ion-alert',
                            }"
                            v-model="azkarFont"
                            slot="end"
                            :ok-text="$t('zikr.del.okBtn')"
                            :cancel-text="$t('zikr.del.cancelBtn')"
                            :placeholder="$t('setup.app.ftype')"
                            :style="`font-family: '${azkarFont}'`"
                            @ionChange="updateProp({ azkarFont })"
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
                    </ion-item>
                </ion-item-group>

                <ion-item-group>
                    <ion-item-divider>
                        <ion-label>{{ $t('setup.app.look') }}</ion-label>
                    </ion-item-divider>
                    <ion-item>
                        <ion-label>{{ $t('setup.app.color') }}</ion-label>
                        <ion-select
                            slot="end"
                            v-model="theme"
                            :interface-options="{
                                cssClass: 'fontType ion-alert',
                            }"
                            :ok-text="$t('zikr.del.okBtn')"
                            :cancel-text="$t('zikr.del.cancelBtn')"
                            :placeholder="$t('setup.app.color')"
                            :style="
                                `background-color: var(--ion-color-${theme})`
                            "
                            @ionChange="setPRColor"
                        >
                            <ion-select-option
                                v-for="c in colors"
                                :key="c + Math.random()"
                                :class="c"
                                :value="c"
                            >
                            </ion-select-option>
                        </ion-select>
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
        isPlatform,
    } from '@ionic/vue';
    import loader from '@/utils/loader';
    import { UserEntity, Fonts, ThemeColors } from '@/schema/UserEntity';
    import db from '@/utils/db';
    import { setStyles } from '@/common/styleApp';
    import { Plugins } from '@capacitor/core';
    import { COLORES } from '@/App.vue';
    const { StatusBar } = Plugins;

    export const FontTypes = [
        Fonts.Base,
        Fonts.Amiri,
        Fonts.AmiriUnColored,
        Fonts.Hafs,
        Fonts.Tajawal,
        Fonts.Mirza,
        Fonts.Ruqaa,
    ];

    let appBusy = true;

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
        lang = 'ar';
        fontSize = 1;
        fontSizeVal = 1;
        fontType = Fonts.Base;
        azkarFont = Fonts.Amiri;
        theme = ThemeColors[0]; // primary as defualt
        dark = false;
        fontTypes = FontTypes;
        azkarFonts = [
            Fonts.AmiriUnColored,
            Fonts.Amiri,
            Fonts.Hafs,
            Fonts.Mirza,
            Fonts.Ruqaa,
        ];
        colors = ThemeColors;

        async loadAppSet() {
            await loader.show();

            const res = (
                await (await db())
                    .createQueryBuilder(UserEntity, 'user_set')
                    .select('lang, fontSize, fontType, azkarFont, theme, dark')
                    .limit(1)
                    .execute()
            )[0];

            this.lang = res.lang;
            this.fontSize = res.fontSize;
            this.fontType = res.fontType;
            this.azkarFont = res.azkarFont;
            this.theme = res.theme;
            this.dark = res.dark;

            setTimeout(() => appBusy = false, 800);

            await loader.hide();
        }

        async updateProp(prop: object, restart = false) {
            if (appBusy) return;

            await loader.show();

            await (await db())
                .createQueryBuilder(UserEntity, 'user_set')
                .update()
                .set(prop)
                .execute();

            await loader.hide();

            if (restart) {                
                window.location.reload();                
                return;
            }

            setStyles(this.theme, this.fontType, `${this.fontSize}`);

            // @ts-ignore
            if (typeof prop.dark === 'undefined') return;

            // @ts-ignore
            if (prop.dark) {
                document.documentElement.classList.add('theme-dark');

                // change font from AmiriQuranColored to AmiriQuran
                // because Colored not working with dark mode
                if (this.azkarFont === Fonts.Amiri) {
                    await this.updateProp({ azkarFont: Fonts.AmiriUnColored });
                    this.azkarFont = Fonts.AmiriUnColored;
                }

                return;
            }
            document.documentElement.classList.remove('theme-dark');
        }

        async setFontSize() {
            await this.updateProp({ fontSize: this.fontSizeVal }, true);
            this.fontSize = this.fontSizeVal;
        }

        async setPRColor() {
            await loader.show();

            await this.updateProp({ theme: this.theme }, false);

            if (!isPlatform('hybrid')) return await loader.hide();

            await StatusBar.setBackgroundColor({
                color: COLORES.filter((x) => x.id === this.theme)[0].color,
            });

            await loader.hide();
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
        .AmiriQuran {
            font-family: 'AmiriQuran';
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
        .primary-fall {
            background: var(--ion-color-primary-fall);
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
        .teal {
            background: var(--ion-color-teal);
        }
        .pink {
            background: var(--ion-color-pink);
        }
        .purple {
            background: var(--ion-color-purple);
        }
    }
</style>
