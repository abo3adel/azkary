<template>
    <txt-card
        :sty="`font-family: '${azkarFont}';line-height: 1.5rem;`"
        cls="mt-5 text-sm"
        :title="$t('home.du3a')"
        :ar="ar"
        :disable-en="true"
    >
    </txt-card>
</template>
<script lang="ts">
    import { Options, Vue, prop } from 'vue-class-component';
    class Props {
        azkarFont = prop<string>({ required: true });
    }
    import TxtCard from '@/components/TxtCard.vue';
    import db from '@/utils/db';

    @Options({ components: { TxtCard } })
    export default class Du3a extends Vue.with(Props) {
        ar = '';

        async loadDu3a() {
            const du3a = await (await db()).query(
                'SELECT body FROM ad3ia WHERE id < 150 ORDER BY RANDOM() LIMIT 1'
            );
            this.ar =
                du3a[0]?.body ??
                'اللَّهُمَّ إِنِّي أَسْأَلُكَ الجَنَّة وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ وَعَمَلٍ ، وَأَعُوذُ بِكَ مَنَ النَّارِ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ وَعَمَلٍ.';
        }

        mounted() {
            setTimeout(async () => {
                await this.loadDu3a();
            }, 800);
        }
    }
</script>
