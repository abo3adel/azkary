<template>
    <txt-card
        :sty="`font-family: '${azkarFont}';line-height: 2.2rem;`"
        cls="-mt-3 text-sm"
        :title="$t('home.quran')"
        :ar="quran.ar"
        :en="quran.en"
        :error="{ ar: quran.ar === false, en: quran.en === false }"
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
    const { Storage, Network } = Plugins;

    class Props {
        azkarFont = prop<string>({required: true})
    }

    @Options({ components: { TxtCard } })
    export default class Quran extends Vue.with(Props) {
        quran = {
            ar: '',
            en: '',
            surah: '',
            num: '',
        };

        async mounted() {
            const net = (await Network.getStatus()).connected;
            if (!net) {
                // load from local storage
                // or show error

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
                this.quran.ar = value.ar;
                // @ts-ignore
                this.quran.en = value.en;
                // @ts-ignore
                this.quran.surah = value.surah;
                // @ts-ignore
                this.quran.num = value.num;

                return;
            }

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

            this.quran.ar =
                'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ';

            this.quran.surah = 'سُورَةُ البَقَرَةِ';
            this.quran.num = '255';
            this.quran.en =
                'GOD - there is no deity save Him, the Ever-Living, the Self-Subsistent Fount of All Being. Neither slumber overtakes Him, nor sleep. His is all that is in the heavens and all that is on earth. Who is there that could intercede with Him, unless it be by His leave? He knows all that lies open before men and all that is hidden from them, whereas they cannot attain to aught of His knowledge save that which He wills [them to attain]. His eternal power overspreads the heavens and the earth, and their upholding wearies Him not. And he alone is truly exalted, tremendous.';

            Storage.set({
                key: 'quran_aya',
                value: JSON.stringify({
                    ar: this.quran.ar,
                    en: this.quran.en,
                    surah: this.quran.surah,
                    num: this.quran.num,
                }),
            });
        }
    }
</script>
