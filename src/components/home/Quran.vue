<template>
    <txt-card
        :sty="`font-family: '${azkarFont}';line-height: 2.2rem;`"
        cls="-mt-3 text-sm"
        :title="$t('home.quran')"
        :ar="quran.ar"
        :en="quran.en"
        :error="{ ar: quran.ar === false, en: quran.en === false }"
        @refresh="loadQuranAya"
    >
        <template #meta>
            <p class="text-left">({{ quran.surah }} - {{ quran.num }})</p>
        </template>
    </txt-card>
</template>
<script lang="ts">
    import { Options, Vue, prop } from 'vue-class-component';
    import TxtCard from '@/components/TxtCard.vue';
    import { Plugins } from '@capacitor/core';
    import axios, { AxiosResponse } from 'axios';
    const { Storage, Network } = Plugins;

    class Props {
        azkarFont = prop<string>({ required: true });
    }

    @Options({ components: { TxtCard } })
    export default class Quran extends Vue.with(Props) {
        quran = {
            ar: '',
            en: '',
            surah: '',
            num: '',
        };
        busy = false;

        random(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        get ayaCount(): number[] {
            return [
                7,
                286,
                200,
                176,
                120,
                165,
                206,
                75,
                129,
                109,
                123,
                111,
                43,
                52,
                99,
                128,
                111,
                110,
                98,
                135,
                112,
                78,
                118,
                64,
                77,
                227,
                93,
                88,
                69,
                60,
                34,
                30,
                73,
                54,
                45,
                83,
                182,
                88,
                75,
                85,
                54,
                53,
                89,
                59,
                37,
                35,
                38,
                29,
                18,
                45,
                60,
                49,
                62,
            ];
        }

        async offline() {
            let { value } = await Storage.get({ key: 'quran_aya' });

            if (!value) {
                // @ts-ignore
                this.quran.ar = false;
                // @ts-ignore
                this.quran.en = false;
                return;
            }

            value = JSON.parse(value);

            // @ts-ignore
            if (!value.ar.length) {
                // @ts-ignore
                this.quran.ar = false;
                // @ts-ignore
                this.quran.en = false;
                return;
            }

            // @ts-ignore
            this.quran.ar = value.ar;
            // @ts-ignore
            this.quran.en = value.en;
            // @ts-ignore
            this.quran.surah = value.surah;
            // @ts-ignore
            this.quran.num = value.num;

            this.busy = false;

            return;
        }

        async loadQuranAya() {
            if (this.busy) return;

            // reset
            this.busy = true;
            this.quran.ar = '';
            this.quran.en = '';

            const net = (await Network.getStatus()).connected;

            if (!net) {
                // load from local storage
                // or show error
                return await this.offline();
            }

            const surah = this.random(2, 53);
            const aya = this.random(3, this.ayaCount[surah - 1]);

            // load quran
            let res = await axios
                .get(`http://api.alquran.cloud/v1/ayah/${surah}:${aya}/ar.asad`)
                .catch((e) => null);
            if (!res) {
                return await this.offline();
            }

            this.quran.ar = res.data.text;
            this.quran.surah = res.data.surah.name;
            this.quran.num = res.data.numberInSurah;

            res = await axios
                .get(`http://api.alquran.cloud/v1/ayah/${surah}:${aya}/en.asad`)
                .catch((e) => null);
            if (!res) {
                // @ts-ignore
                this.quran.en = false;
                return;
            }
            this.quran.en = (res as AxiosResponse).data.text;

            // this.quran.ar =
            //     'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ';

            // this.quran.surah = 'سُورَةُ البَقَرَةِ';
            // this.quran.num = '255';
            // this.quran.en =
            //     'GOD - there is no deity save Him, the Ever-Living, the Self-Subsistent Fount of All Being. Neither slumber overtakes Him, nor sleep. His is all that is in the heavens and all that is on earth. Who is there that could intercede with Him, unless it be by His leave? He knows all that lies open before men and all that is hidden from them, whereas they cannot attain to aught of His knowledge save that which He wills [them to attain]. His eternal power overspreads the heavens and the earth, and their upholding wearies Him not. And he alone is truly exalted, tremendous.';

            Storage.set({
                key: 'quran_aya',
                value: JSON.stringify({
                    ar: this.quran.ar,
                    en: this.quran.en,
                    surah: this.quran.surah,
                    num: this.quran.num,
                }),
            });
            this.busy = false;
        }

        async mounted() {
            this.loadQuranAya();
        }
    }
</script>
