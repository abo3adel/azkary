<template>
    <div
        class="content h-3/4 slide-theme"
        :style="
            theme === 'slide-colored'
                ? `--swiper-theme-color: var(--ion-color-${color})`
                : ''
        "
    >
        <swiper
            class="h-full text-center swiper"
            :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
            navigation
            virtual
            keyboard
            :pagination="{ type: 'progressbar' }"
            @swiper="swiper = $event"
            @slideChange="onSlideChange"
        >
            <swiper-slide
                class="w-full h-full"
                v-for="(z, zinx) in azkar"
                :key="z.id"
                :virtualIndex="zinx"
                @click.prevent="
                    z.count--;
                    onClicked(z, zinx);
                "
            >
                <div class="flex h-full overflow-auto">
                    <div class="m-auto">
                        {{ z.body }}
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
    <div class="flex flex-wrap w-full controls h-1/4">
        <div class="relative w-1/2 mx-auto text-sm text-center">
            <div class="w-28 h-28">
                <Progress id="showZikr" ref="showBar" :gradient="barColor" />
            </div>
        </div>
        <div class="flex flex-wrap w-1/2 text-base">
            <div class="flex flex-col w-1/2 pl-1 text-left">
                <span class="text-lg">{{ $t('zikr.count') }}</span>
                <span class="text-xl font-semibold">{{ current.count }}</span>
            </div>
            <div class="w-1/2 pr-1 text-base text-right">
                <span class="text-3xl font-semibold">{{
                    activeIndex + 1
                }}</span>
                <span class="text-lg">/{{ azkar.length }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Options, Vue, prop } from 'vue-class-component';
    import { EmitsList, showOprs } from './Abstract';
    import { Zikr } from '@/entities/Zikr';

    // @ts-ignore
    import emitter from 'tiny-emitter/instance';

    // import Swiper core and required modules
    import SwiperCore, {
        Navigation,
        Pagination,
        Virtual,
        Keyboard,
    } from 'swiper';

    // @ts-ignore
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import Progress from '@/components/Progress.vue';
    import { COLORES } from '@/App.vue';

    SwiperCore.use([Navigation, Pagination, Virtual, Keyboard]);

    class Props {
        azkar = prop<Zikr[]>({ required: true, default: [] });
        azkarClone = prop<{ count: number; id: number }[]>({ required: true });
        color = prop<string>({ required: true });
        theme = prop<string>({ required: true });
        keyboard = prop<boolean>({ default: true });
    }

    @Options({
        components: { Swiper, SwiperSlide, Progress },
        emits: EmitsList,
        watch: {
            azkar: {
                handler() {
                    this.azkarUpdated();
                },
            },
        },
    })
    export default class SideTheme extends Vue.with(Props) {
        bar!: Progress;
        swiper: any;
        activeIndex = 0;
        zikr: Zikr = new Zikr();
        barColor = [
            ['#572c82', 0],
            ['#49a09d', 50],
        ];

        /**
         * set current viewable zikr item
         */
        onSlideChange(ev: any) {
            this.activeIndex = ev.activeIndex;
            this.zikr = Object.assign({}, this.current);
            // update zikr count to item iniate count
            this.zikr.count = this.azkarClone[this.activeIndex]?.count ?? 1;

            // complete bar if this item was alraady readed
            if (!this.current.count) {
                this.bar.set(1);
                // this.bar.setText(1);
                return;
            }

            // if user clicked this item and did not finish count
            // then show current count on progress bar
            if (this.zikr.count > this.current.count) {
                this.bar.set(
                    (this.zikr.count - this.current.count) / this.zikr.count
                );
                return;
            }

            // reset bar
            this.bar.set(0);
        }

        /**
         * calculate progress value and slide to next slide
         * if current item count is 0
         */
        onClicked(zikr: Zikr) {
            // if current item was already readed then slide
            if (zikr.count < 0) {
                // increment back to zero
                zikr.count++;
                this.swiper.slideNext();
                return;
            }

            this.$emit('decree', {
                count: zikr.count,
                id: zikr.id,
                // make sure there is no elements with count > 0
                // aka all items was readed
                open: zikr.count === 0 && !this.azkar.some((x) => x.count > 0),
            });

            // calculate progress next value
            // progress range 0 -> 1
            const val = this.current.count / this.zikr.count;

            if (Math.floor(val) >= zikr.count) {
                // zikr item is at final count
                this.bar.set(1);

                // wait for progress to set then slide
                setTimeout(() => this.swiper.slideNext(), 305);
                return;
            }

            this.bar.set(
                (this.zikr.count - this.current.count) / this.zikr.count
            );
        }

        /**
         * iniate progress bar
         */
        setProgressBar() {
            this.bar = this.$refs.showBar as Progress;

            const baseColor =
                COLORES.find((x) => x.id === this.color)?.lighter ?? 'red';
            this.barColor[1] = [baseColor, 50];
            this.bar.init('', this.barColor);
        }

        opts() {
            showOprs(this.current, this);
        }

        /**
         * get current viewable zikr item
         * which has updated count to latest
         *
         * @returns Zikr
         */
        get current(): Zikr {
            return this.azkar.length
                ? this.azkar[this.activeIndex]
                : new Zikr();
        }

        azkarUpdated() {
            if (this.zikr.id) {
                this.zikr = Object.assign({}, this.azkar[this.activeIndex]);
            } else {
                this.zikr = Object.assign({}, this.azkar[0]);
            }

            this.bar.set(
                (this.zikr.count - this.current.count) / this.zikr.count
            );
        }

        /**
         * reset zikr item count
         */
        beforeMount() {
            this.zikr.count = 0;
        }

        mounted() {
            this.setProgressBar();

            emitter.on('deleted', () => this.azkarUpdated());

            emitter.on('slide-cog', () => {
                this.opts();
            });

            emitter.on('space-clicked', () => {
                this.current.count--;
                this.onClicked(this.current);
            });

            this.zikr = Object.assign({}, this.azkar[0]);
        }
    }
</script>
<style>
    /**
 * Swiper 6.4.14
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 17, 2021
 */
    .swiper-container {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        list-style: none;
        padding: 0;
        /* Fix of Webkit flickering */
        z-index: 1;
    }
    .swiper-container-vertical > .swiper-wrapper {
        flex-direction: column;
    }
    .swiper-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        transition-property: transform;
        box-sizing: content-box;
    }
    .swiper-container-android .swiper-slide,
    .swiper-wrapper {
        transform: translate3d(0px, 0, 0);
    }
    .swiper-container-multirow > .swiper-wrapper {
        flex-wrap: wrap;
    }
    .swiper-container-multirow-column > .swiper-wrapper {
        flex-wrap: wrap;
        flex-direction: column;
    }
    .swiper-container-free-mode > .swiper-wrapper {
        transition-timing-function: ease-out;
        margin: 0 auto;
    }
    .swiper-container-pointer-events {
        touch-action: pan-y;
    }
    .swiper-container-pointer-events.swiper-container-vertical {
        touch-action: pan-x;
    }
    .swiper-slide {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
        transition-property: transform;
    }
    .swiper-slide-invisible-blank {
        visibility: hidden;
    }
    /* Auto Height */
    .swiper-container-autoheight,
    .swiper-container-autoheight .swiper-slide {
        height: auto;
    }
    .swiper-container-autoheight .swiper-wrapper {
        align-items: flex-start;
        transition-property: transform, height;
    }
    /* 3D Effects */
    .swiper-container-3d {
        perspective: 1200px;
    }
    .swiper-container-3d .swiper-wrapper,
    .swiper-container-3d .swiper-slide,
    .swiper-container-3d .swiper-slide-shadow-left,
    .swiper-container-3d .swiper-slide-shadow-right,
    .swiper-container-3d .swiper-slide-shadow-top,
    .swiper-container-3d .swiper-slide-shadow-bottom,
    .swiper-container-3d .swiper-cube-shadow {
        transform-style: preserve-3d;
    }
    .swiper-container-3d .swiper-slide-shadow-left,
    .swiper-container-3d .swiper-slide-shadow-right,
    .swiper-container-3d .swiper-slide-shadow-top,
    .swiper-container-3d .swiper-slide-shadow-bottom {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
    }
    .swiper-container-3d .swiper-slide-shadow-left {
        background-image: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0)
        );
    }
    .swiper-container-3d .swiper-slide-shadow-right {
        background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0)
        );
    }
    .swiper-container-3d .swiper-slide-shadow-top {
        background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0)
        );
    }
    .swiper-container-3d .swiper-slide-shadow-bottom {
        background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0)
        );
    }
    /* CSS Mode */
    .swiper-container-css-mode > .swiper-wrapper {
        overflow: auto;
        scrollbar-width: none;
        /* For Firefox */
        -ms-overflow-style: none;
        /* For Internet Explorer and Edge */
    }
    .swiper-container-css-mode > .swiper-wrapper::-webkit-scrollbar {
        display: none;
    }
    .swiper-container-css-mode > .swiper-wrapper > .swiper-slide {
        scroll-snap-align: start start;
    }
    .swiper-container-horizontal.swiper-container-css-mode > .swiper-wrapper {
        scroll-snap-type: x mandatory;
    }
    .swiper-container-vertical.swiper-container-css-mode > .swiper-wrapper {
        scroll-snap-type: y mandatory;
    }

    .swiper-button-prev,
    .swiper-button-next {
        position: absolute;
        top: 50%;
        width: calc(var(--swiper-navigation-size) / 44 * 27);
        height: var(--swiper-navigation-size);
        margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
        z-index: 10;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--swiper-navigation-color, var(--swiper-theme-color));
    }
    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled {
        opacity: 0.35;
        cursor: auto;
        pointer-events: none;
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
        font-family: swiper-icons;
        font-size: var(--swiper-navigation-size);
        text-transform: none !important;
        letter-spacing: 0;
        text-transform: none;
        font-variant: initial;
        line-height: 1;
    }
    .swiper-button-prev,
    .swiper-container-rtl .swiper-button-next {
        left: 10px;
        right: auto;
    }
    .swiper-button-prev:after,
    .swiper-container-rtl .swiper-button-next:after {
        content: 'prev';
    }
    .swiper-button-next,
    .swiper-container-rtl .swiper-button-prev {
        right: 10px;
        left: auto;
    }
    .swiper-button-next:after,
    .swiper-container-rtl .swiper-button-prev:after {
        content: 'next';
    }
    .swiper-button-prev.swiper-button-white,
    .swiper-button-next.swiper-button-white {
        --swiper-navigation-color: #ffffff;
    }
    .swiper-button-prev.swiper-button-black,
    .swiper-button-next.swiper-button-black {
        --swiper-navigation-color: #000000;
    }
    .swiper-button-lock {
        display: none;
    }

    .swiper-pagination {
        position: absolute;
        text-align: center;
        transition: 300ms opacity;
        transform: translate3d(0, 0, 0);
        z-index: 10;
    }
    .swiper-pagination.swiper-pagination-hidden {
        opacity: 0;
    }
    /* Common Styles */
    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 10px;
        left: 0;
        width: 100%;
    }

    .swiper-pagination-clickable .swiper-pagination-bullet {
        cursor: pointer;
    }

    /* Progress */
    .swiper-pagination-progressbar {
        background: rgba(0, 0, 0, 0.25);
        position: absolute;
    }
    .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
        background: var(--swiper-pagination-color, var(--swiper-theme-color));
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform: scale(0);
        transform-origin: left top;
    }
    .swiper-container-rtl
        .swiper-pagination-progressbar
        .swiper-pagination-progressbar-fill {
        transform-origin: right top;
    }
    .swiper-container-horizontal > .swiper-pagination-progressbar,
    .swiper-container-vertical
        > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
        width: 100%;
        height: 4px;
        left: 0;
        top: 0;
    }
    .swiper-container-vertical > .swiper-pagination-progressbar,
    .swiper-container-horizontal
        > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
        width: 4px;
        height: 100%;
        left: 0;
        top: 0;
    }
    .swiper-pagination-white {
        --swiper-pagination-color: #ffffff;
    }
    .swiper-pagination-black {
        --swiper-pagination-color: #000000;
    }
    .swiper-pagination-lock {
        display: none;
    }
    /* a11y */
    .swiper-container .swiper-notification {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        opacity: 0;
        z-index: -1000;
    }
    .swiper-container-fade.swiper-container-free-mode .swiper-slide {
        transition-timing-function: ease-out;
    }
    .swiper-container-fade .swiper-slide {
        pointer-events: none;
        transition-property: opacity;
    }
    .swiper-container-fade .swiper-slide .swiper-slide {
        pointer-events: none;
    }
    .swiper-container-fade .swiper-slide-active,
    .swiper-container-fade .swiper-slide-active .swiper-slide-active {
        pointer-events: auto;
    }
    .swiper-container-cube {
        overflow: visible;
    }
    .swiper-container-cube .swiper-slide {
        pointer-events: none;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        z-index: 1;
        visibility: hidden;
        transform-origin: 0 0;
        width: 100%;
        height: 100%;
    }
    .swiper-container-cube .swiper-slide .swiper-slide {
        pointer-events: none;
    }
    .swiper-container-cube.swiper-container-rtl .swiper-slide {
        transform-origin: 100% 0;
    }
    .swiper-container-cube .swiper-slide-active,
    .swiper-container-cube .swiper-slide-active .swiper-slide-active {
        pointer-events: auto;
    }
    .swiper-container-cube .swiper-slide-active,
    .swiper-container-cube .swiper-slide-next,
    .swiper-container-cube .swiper-slide-prev,
    .swiper-container-cube .swiper-slide-next + .swiper-slide {
        pointer-events: auto;
        visibility: visible;
    }
    .swiper-container-cube .swiper-slide-shadow-top,
    .swiper-container-cube .swiper-slide-shadow-bottom,
    .swiper-container-cube .swiper-slide-shadow-left,
    .swiper-container-cube .swiper-slide-shadow-right {
        z-index: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .swiper-container-cube .swiper-cube-shadow {
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        z-index: 0;
    }
    .swiper-container-cube .swiper-cube-shadow:before {
        content: '';
        background: #000;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        -webkit-filter: blur(50px);
        filter: blur(50px);
    }
    .swiper-container-flip {
        overflow: visible;
    }
    .swiper-container-flip .swiper-slide {
        pointer-events: none;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        z-index: 1;
    }
    .swiper-container-flip .swiper-slide .swiper-slide {
        pointer-events: none;
    }
    .swiper-container-flip .swiper-slide-active,
    .swiper-container-flip .swiper-slide-active .swiper-slide-active {
        pointer-events: auto;
    }
    .swiper-container-flip .swiper-slide-shadow-top,
    .swiper-container-flip .swiper-slide-shadow-bottom,
    .swiper-container-flip .swiper-slide-shadow-left,
    .swiper-container-flip .swiper-slide-shadow-right {
        z-index: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
</style>
