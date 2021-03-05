<template>
    <ion-slides
        class="h-full bg-gradient-to-tr from-gray-50 to-gray-200"
        :options="slideOpts"
        :pager="true"
        dir="rtl"
    >
        <ion-slide class="">
            <div class="w-full slide">
                <first-slide />
            </div>
        </ion-slide>

        <ion-slide>
            <div class="w-full slide">
                <div class="w-1/2 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/muslim.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <h2 class="block text-5xl">{{ $t('app.slide.azkar') }}</h2>
                <p class="mt-4 text-2xl">
                    {{ $t('app.slide.azkarMess') }}
                </p>
            </div>
        </ion-slide>

        <ion-slide>
            <div class="w-full slide">
                <div class="w-1/2 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/praying.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <h2 class="block text-5xl">{{ $t('app.slide.ad3ia') }}</h2>
                <p class="mt-4 text-2xl">
                    <small>(</small>
                    <span style="font-family: 'AmiriQuranColored'">
                        وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ
                    </span>
                    <small>)</small>
                </p>
            </div>
        </ion-slide>

        <ion-slide>
            <div class="w-full slide">
                <div class="w-1/2 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/tasbih.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <h2 class="block text-5xl">{{ $t('app.slide.sebha') }}</h2>
                <p class="mt-4 text-2xl">
                    {{ $t('app.slide.sebhaMess') }}
                </p>
            </div>
        </ion-slide>

        <ion-slide>
            <div class="w-full slide">
                <div class="w-1/2 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/computer.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <h2 class="block text-5xl">{{ $t('app.slide.pc') }}</h2>
                <p class="mt-4 text-2xl">
                    {{ $t('app.slide.pcMess') }}
                </p>
                <ion-button
                    color="primary"
                    size="large"
                    @click.prevent="copyLink"
                    class="mt-3"
                >
                    {{ $t('app.slide.pcCopy') }}
                </ion-button>
            </div>
        </ion-slide>

        <ion-slide>
            <div class="w-full slide">
                <div class="w-1/2 mx-auto mb-4 -mt-14">
                    <img
                        src="/assets/slides/correction.svg"
                        width="20"
                        height="20"
                        class="w-8 h-8"
                    />
                </div>
                <ion-button
                    color="primary"
                    size="large"
                    @click.prevent="$emit('start')"
                >
                    {{ $t('app.slide.start') }}
                </ion-button>
            </div>
        </ion-slide>
    </ion-slides>
</template>
<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import { IonSlides, IonSlide, IonButton } from '@ionic/vue';
    import FirstSlide from '@/components/FirstSlide.vue';
    import toast from '@/utils/toast';
    import { Plugins, LocalNotifications } from '@capacitor/core';
    import getCategoryIcon from '@/utils/getCategoryIcon';
    import Axios from 'axios';
    import db from '@/utils/db';
    import { Zikr } from '@/schema/ZikrEntity';
    import { Category } from '@/schema/CategoryEntity';
    import seeder from '@/seeder';
    import { getRepository } from 'typeorm';
    import { NotifyZikr } from '@/schema/NotifyZikrEntity';
    import { Sebha } from '@/entities/Sebha';
    import { DateTime } from 'luxon';

    const { Clipboard } = Plugins;

    @Options({
        components: { IonSlides, IonSlide, IonButton, FirstSlide },
        emits: ['start', 'hideSlide'],
    })
    export default class FirstTimeSlides extends Vue {
        slideOpts = {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
        };

        copyLink() {
            Clipboard.write({
                string: 'http://abo3adel.github.io',
            });

            toast(this.$t('app.copied'));
        }

        async seedDB() {
            const cats = getCategoryIcon().map((x) => x.slug);
            const du3aCats = [
                'quranic',
                'prophet_mohamed',
                'prophets',
                'mix_du3a',
                'quran_end',
                'du3a_favour',
                'roqia_shar3ia',
                'death',
            ];
            let i = 0;
            // seed azkar and ad3ia -- with categories
            for (const cat of cats) {
                const data = await Axios.get(`/assets/data/${cat}.json`);

                if (!data) continue;

                const itemRepo =
                    du3aCats.indexOf(cat as string) > -1 ? 'du3a' : 'zikr';

                // create category
                const c = await (await db())
                    .getRepository<Category>('category')
                    .save({ slug: cat, type: itemRepo });
                i = 1;
                for (const { text, meta, count } of data.data) {
                    // insert data
                    await (await db()).getRepository<Zikr>(itemRepo).save({
                        body: text,
                        meta: meta,
                        count: count,
                        order: i,
                        category: c,
                    });

                    i++;
                }
            }

            // insert into notify azkar
            const notify = await Axios.get(`/assets/data/notify.json`);

            if (notify && notify.data) {
                const repo = getRepository<NotifyZikr>('notify_zikr');
                for (const zikr of notify.data) {
                    repo.insert({
                        body: zikr.text,
                        byUser: false,
                        notifiable: zikr.notifiable,
                    });
                }
            }

            // insert into sebha
            const tasabeeh = await Axios.get('/assets/data/tasabeeh.json');
            if (tasabeeh && tasabeeh.data) {
                const repo = getRepository<Sebha>('sebha');
                for (const { body, max } of tasabeeh.data) {
                    repo.insert({ body, max });
                }
            }

            // seed user configrations table with default values
            await seeder.run();

            // iniate notifications
            await this.addNotification(
                1,
                this.$t('setup.azkar.morningTime'),
                '2021-02-22T06:30:46.789'
            );

            await this.addNotification(
                2,
                this.$t('setup.azkar.nightTime'),
                '2021-02-22T17:30:46.789'
            );

            // set notify azkar
            for (let i = 0; i < 5; i++) {
                const dt = DateTime.now()
                    .set({ hour: 12 })
                    .plus({ hours: 5 * i });
                await this.addNotification(
                    // more than 100 is azkar notifications
                    Math.round(Math.random() * 1000) + i,
                    notify.data[i].text,
                    null,
                    this.$t('name'),
                    dt.hour,
                    dt.minute
                );
            }
        }

        async addNotification(
            id: number,
            body: string,
            iso: string | null,
            title: string = this.$t('name'),
            hour?: number,
            minute?: number
        ) {
            let dt = { hour: 0, minute: 0 };

            if (iso) {
                dt = DateTime.fromISO(iso as string);
            } else {
                dt.hour = hour as number;
                dt.minute = minute as number;
            }

            await LocalNotifications.schedule({
                notifications: [
                    {
                        id,
                        title,
                        body,
                        schedule: {
                            on: {
                                hour: dt.hour,
                                minute: dt.minute,
                            },
                        },
                    },
                ],
            });
        }

        mounted() {
            setTimeout(() => this.$emit('hideSlide'), 600);

            setTimeout(() => this.seedDB(), 100);
        }
    }
</script>
<style>
    .swiper-pagination {
        --bullet-background: #000;
    }
</style>
