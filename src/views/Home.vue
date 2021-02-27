<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary" class="haveBg">
                <ion-title>Home</ion-title>
                <ion-label slot="end" class="mx-1">
                    {{ hijir }}
                </ion-label>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-header collapse="condense">
                <ion-title>Home</ion-title>
            </ion-header>
            <ion-toolbar :color="bg">
                <ion-buttons slot="start">
                    <ion-button color="light">
                        <ion-icon
                            :icon="informationCircleOutline"
                            slot="start"
                        />
                        <ion-label class="hidden sm:inline-block"
                            >about</ion-label
                        >
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-button
                        color="light"
                        @click.prevent="$router.replace('/settings')"
                    >
                        <ion-icon :icon="cogOutline" slot="start" />
                        <ion-label class="hidden sm:inline-block"
                            >settings</ion-label
                        >
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <div
                class="pb-8"
                :style="`background-color: var(--ion-color-${bg})`"
            >
                <h1
                    style="font-family: 'ArefRuqaa-Regular';"
                    class="text-6xl text-center text-white"
                >
                    أذكارى
                </h1>
                <p
                    class="pt-2 text-center text-gray-200"
                    style="font-family: 'ArefRuqaa-Regular';"
                >
                    عطر فمك بذكر اللّه
                </p>
            </div>
            <txt-card
                :sty="`font-family: '${azkarFont}';line-height: 3.5rem;`"
                cls="-mt-3"
                :title="$t('home.quran')"
                :ar="quran.ar"
                :en="quran.en"
            >
                <template #meta>
                    <p class="text-left">
                        ({{ quran.surah }} - {{ quran.num }})
                    </p>
                </template>
            </txt-card>

            <txt-card
                cls="mt-5"
                :title="$t('home.hadith')"
                :ar="hadith.ar"
                :en="hadith.en"
            />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButton,
        IonInput,
        IonButtons,
        IonLabel,
        IonIcon,
        // isPlatform,
    } from '@ionic/vue';
    import { Options, Vue } from 'vue-class-component';
    import { cogOutline, informationCircleOutline } from 'ionicons/icons';
    import getHijirDate from '@/common/getHijirDate';
    import { Fonts } from '@/schema/UserEntity';
    import TxtCard from '@/components/TxtCard.vue';

    import { Plugins } from '@capacitor/core';
    const { Storage } = Plugins;

    @Options({
        components: {
            IonHeader,
            IonToolbar,
            IonTitle,
            IonContent,
            IonPage,
            IonButton,
            IonInput,
            IonButtons,
            IonLabel,
            IonIcon,
            TxtCard,
        },
        inject: ['lang'],
    })
    export default class Home extends Vue {
        hijir = '';
        bg = 'gold';
        azkarFont: string = Fonts.Amiri;
        quran = {
            ar: '',
            en: '',
            surah: '',
            num: '',
        };
        hadith = {
            ar: '',
            en: '',
        };

        cogOutline = cogOutline;
        informationCircleOutline = informationCircleOutline;

        async mounted() {
            // @ts-ignore
            this.hijir = getHijirDate(this.lang);

            if (new Date().getHours() > 12) {
                this.bg = 'tertiary';
            }

            this.azkarFont =
                (await Storage.get({ key: 'azkarFont' })).value ??
                this.azkarFont;

            // load quran
            // let res = await (
            //     await fetch('http://api.alquran.cloud/v1/ayah/2:255/ar.asad')
            // ).json();
            // this.quran.ar = res.data.text;
            // this.quran.surah = res.data.surah.name;
            // this.quran.num = res.data.numberInSurah;

            // res = await (
            //     await fetch('http://api.alquran.cloud/v1/ayah/2:255/en.asad')
            // ).json();
            // this.quran.en = res.data.text;

            this.quran.ar = "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ";
            this.quran.surah = 'سُورَةُ البَقَرَةِ';
            this.quran.num = '255';
            this.quran.en = 'GOD - there is no deity save Him, the Ever-Living, the Self-Subsistent Fount of All Being. Neither slumber overtakes Him, nor sleep. His is all that is in the heavens and all that is on earth. Who is there that could intercede with Him, unless it be by His leave? He knows all that lies open before men and all that is hidden from them, whereas they cannot attain to aught of His knowledge save that which He wills [them to attain]. His eternal power overspreads the heavens and the earth, and their upholding wearies Him not. And he alone is truly exalted, tremendous.';


            // hadith
            // const hadith = await (
            //     await fetch('https://api.sunnah.com/v1/hadiths/random', {
            //         headers: {
            //             'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
            //         },
            //     })
            // ).json();

            this.hadith.ar =
                ' وعنه أن رسول الله صلى الله عليه وسلم قال وهو على المنبر، وذكر الصدقة والتعفف عن المسألة‏:‏ ‏"‏اليد العليا خير من اليد السفلى‏.‏ واليد العليا هي المنفقة، والسفلى هي السائلة‏"‏ ‏(‏‏(‏متفق عليه‏)‏‏)‏‏.‏';
            this.hadith.en =
                'Ibn \'Umar (May Allah be pleased with them) reported: While Messenger of Allah (ﷺ) was on his pulpit (in the mosque) delivering a Khutbah (religious talk) about Sadaqah (charity) and begging, he said, "The upper hand is better than the lower hand, the upper hand is the one which gives and the lower hand is the begging one.';
        }
    }
</script>
<style></style>
