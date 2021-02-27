<template>
    <txt-card
        cls="mt-5 text-sm"
        :title="$t('home.hadith')"
        :ar="hadith.ar"
        :en="hadith.en"
        :error="{ ar: hadith.ar === false, en: hadith.en === false }"
    >
        <template #meta>
            <p class="text-sm text-right" dir="rtl">({{ hadith.chapter }})</p>
        </template>
        <template #meta-en>
            <p class="text-sm text-left" dir="ltr">({{ hadith.chapterEn }})</p>
        </template>
    </txt-card>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';

    import TxtCard from '@/components/TxtCard.vue';
    import { Plugins } from '@capacitor/core';
    const { Storage, Network } = Plugins;

    @Options({ components: { TxtCard } })
    export default class Hadith extends Vue {
        hadith = {
            ar: '',
            en: '',
            chapter: '',
            chapterEn: '',
        };

        async mounted() {
            const net = (await Network.getStatus()).connected;
            
            if (net) {
                // load from local storage
                // or show error
                let { value } = await Storage.get({ key: 'hadith' });

                if (!value) {
                    // @ts-ignore
                    this.hadith.ar = false;
                    // @ts-ignore
                    this.hadith.en = false;
                    return;
                }

                value = JSON.parse(value);

                // @ts-ignore
                this.hadith.ar = value.ar;
                // @ts-ignore
                this.hadith.en = value.en;
                // @ts-ignore
                this.hadith.chapter = value.chapter;
                // @ts-ignore
                this.hadith.chapterEn = value.chapterEn;

                return;
            }

            this.hadith.ar =
                ' وعنه أن رسول الله صلى الله عليه وسلم قال وهو على المنبر، وذكر الصدقة والتعفف عن المسألة‏:‏ ‏"‏اليد العليا خير من اليد السفلى‏.‏ واليد العليا هي المنفقة، والسفلى هي السائلة‏"‏ ‏(‏‏(‏متفق عليه‏)‏‏)‏‏.‏';
            this.hadith.chapter =
                ' باب القناعة والعفاف والاقتصاد في المعيشة والإنفاق وذم السؤال من غير ضرورة';
            this.hadith.en =
                'Ibn \'Umar (May Allah be pleased with them) reported: While Messenger of Allah (ﷺ) was on his pulpit (in the mosque) delivering a Khutbah (religious talk) about Sadaqah (charity) and begging, he said, "The upper hand is better than the lower hand, the upper hand is the one which gives and the lower hand is the begging one.';
            this.hadith.chapterEn =
                'Contentment and Self-esteem and avoidance of unnecessary begging of People';

            Storage.set({
                key: 'hadith',
                value: JSON.stringify({
                    ar: this.hadith.ar,
                    en: this.hadith.en,
                    chapter: this.hadith.chapter,
                    chapterEn: this.hadith.chapterEn,
                }),
            });
        }
    }
</script>
