<template>
    <div class="relative w-full h-full">
        <div :class="id"></div>
        <slot></slot>
        <div class="absolute top-0 flex w-full h-full">
            <div class="m-auto">
                <slot name="absolute"></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Options, Vue, prop } from 'vue-class-component';
    // @ts-ignore
    import emitter from 'tiny-emitter/instance';

    class Props {
        id = prop<string>({ default: `progress${Math.random()}` });
        color = prop<string>({ default: '#000' });
        bg = prop<string>({ default: '#00000024' });
        gradient = prop<(string | number)[][]>({ default: [] });
    }

    @Options({})
    export default class Progress extends Vue.with(Props) {
        svg!: HTMLDivElement;
        shape!: HTMLDivElement;
        value = 0;

        set(n: number) {
            if (!this.shape) return;

            const strokeArr = parseInt(this.shape.style.strokeDasharray);

            this.value = ((strokeArr * n) / strokeArr) * 100;
            this.shape.style.strokeDashoffset = `${strokeArr - n * strokeArr}`;
        }

        getVal(): number {
            return this.value;
        }

        init(color = this.color, gradient = this.gradient) {
            // @ts-ignore
            window.CPB.draw({
                elementClass: this.id,
                value: this.value,
                indicatorColor: this.gradient.length ? 'useGradient' : color,
                trackColor: this.bg,
                indicatorCap: 'round',
                barSize: 1,
                useText: true,
                setText: '',
                setGradient: gradient,
                useGradient: this.gradient.length,
            });

            setTimeout(() => {
                // enable responsive
                this.svg = document.querySelector(
                    `.${this.id} svg`
                ) as HTMLDivElement;
                this.svg.removeAttribute('width');
                this.svg.removeAttribute('height');

                this.shape = this.svg.querySelector(
                    `circle.${this.id}-indicator`
                ) as HTMLDivElement;
                this.shape.style.transition = 'all 0.3s ease';
            }, 100);
        }

        mounted() {
            this.init();

            emitter.on('color-updated', (color: string) => {
                this.init(color);
            });
        }
    }
</script>
