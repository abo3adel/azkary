<template>
    <div class="relative w-11/12 mx-auto mt-4 mb-8" v-if="z.count > 0">
        <div
            class="relative px-3 pt-2 pb-4 overflow-hidden break-words border border-gray-500 rounded-md shadow-2xl select-none hover:cursor-pointer ion-activatable ripple-parent"
            @click="
                z.count--;
                $emit('decree', z.count, z.id);
            "
            dir="rtl"
            style="background-color: var(--ion-item-background)"
        >
            <p
                class="text-sm text-primary-600"
                style="font-family: var(--ion-default-font)"
                :style="
                    theme === 'dev-colored'
                        ? `color: var(--ion-color-${color})`
                        : ''
                "
            >
                {{ z.meta }}
            </p>
            <span v-html="highlite(z.body)"></span>
            <slot name="order"></slot>
            <ion-ripple-effect></ion-ripple-effect>
        </div>
        <div
            class="relative flex flex-wrap w-11/12 p-1 py-1 mx-auto -m-3 text-sm rounded-md shadow-2xl select-none bg-primary-600 footer text-color"
            style="font-family: var(--ion-default-font)"
            :style="
                theme === 'dev-colored'
                    ? `background: var(--ion-color-${color})`
                    : ''
            "
        >
            <div
                class="relative w-1/2 overflow-hidden text-center border-r border-current rtl:border-l rtl:border-r-0 ion-activatable ripple-parent hover:cursor-pointer"
                @click="
                    z.count--;
                    $emit('decree', z.count, z.id);
                "
            >
                {{ $t('zikr.count') }}:
                <span
                    class="w-4 h-4 p-1 text-xs border border-current rounded-full"
                >
                    {{ z.count }}
                </span>
                <ion-ripple-effect></ion-ripple-effect>
            </div>
            <div
                class="relative w-1/2 overflow-hidden text-center ion-activatable ripple-parent hover:cursor-pointer"
                @click="opts(z)"
            >
                <ion-icon
                    class="mx-1 align-middle text-md"
                    :icon="cogOutline"
                ></ion-icon>
                <ion-label>
                    {{ $t('zikr.opr') }}
                </ion-label>
                <ion-ripple-effect></ion-ripple-effect>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Options, prop } from 'vue-class-component';
    import { cogOutline } from 'ionicons/icons';
    import { IonRippleEffect, IonIcon, IonLabel } from '@ionic/vue';
    import { EmitsList, Props as Abstract, highliteText } from './Abstract';
    import { Zikr } from '@/entities/Zikr';

    class Props extends Abstract {
        theme = prop<string>({ required: true });
    }

    @Options({
        components: { IonRippleEffect, IonIcon, IonLabel },
        emits: EmitsList,
    })
    export default class DevTheme extends Vue.with(Props) {
        cogOutline = cogOutline;

        async opts(zikr: Zikr) {
            this.$emit('opts', zikr);
        }

        highlite(txt: string) {
            return highliteText(txt, this.theme, this.color);
        }
    }
</script>
<style lang="postcss">
    .opr-actions {
        button {
            @apply transition duration-300 ease-in;
            &:hover {
                @apply font-semibold;
            }
        }
        button.addSebhaBtn * {
            @apply text-pink-600;
        }
        button.editBtn * {
            @apply text-blue-600;
        }
        button.shareBtn * {
            @apply text-teal-600;
        }
        button.deleteBtn * {
            @apply text-red-600;
        }
        button.cancelBtn * {
            @apply text-orange-600;
        }
    }
</style>
