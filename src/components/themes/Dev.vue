<template>
    <div class="relative w-11/12 mx-auto mt-4 mb-8" v-if="z.count > 0">
        <div
            class="relative px-3 pt-2 pb-4 overflow-hidden bg-gray-100 border border-gray-500 rounded-md shadow-2xl select-none hover:cursor-pointer ion-activatable ripple-parent "
            @click="
                z.count--;
                $emit('decree', z.count, z.id);
            "
            dir="rtl"
        >
            {{ z.body }}
            <slot name="order"></slot>
            <ion-ripple-effect></ion-ripple-effect>
        </div>
        <div
            class="relative flex flex-wrap w-11/12 p-1 py-1 mx-auto -m-3 text-sm rounded-md shadow-2xl select-none bg-primary-600 footer text-color"
            :style="
                theme === 'dev-colored'
                    ? `background: var(--ion-color-${color})`
                    : ''
            "
        >
            <div
                class="relative w-1/2 overflow-hidden text-center border-r border-current ion-activatable ripple-parent hover:cursor-pointer"
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
                @click="showOprs(z)"
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
    import { Vue, prop, Options } from 'vue-class-component';
    import { Zikr } from '@/entities/Zikr';
    import {
        createOutline,
        trashBinOutline,
        shareSocialOutline,
        cogOutline,
        closeOutline,
    } from 'ionicons/icons';
    import {
        IonRippleEffect,
        actionSheetController,
        IonIcon,
        IonLabel,
    } from '@ionic/vue';
    import { UserTheme } from '@/entities/User';

    class Props {
        z = prop<Zikr>({ required: true });
        theme = prop<UserTheme>({ required: true });
        color = prop<string>({ default: 'primary' });
    }

    @Options({
        components: { IonRippleEffect, IonIcon, IonLabel },
        emits: ['edit'],
    })
    export default class DevTheme extends Vue.with(Props) {
        createOutline = createOutline;
        trashBinOutline = trashBinOutline;
        shareSocialOutline = shareSocialOutline;
        cogOutline = cogOutline;
        closeOutline = closeOutline;

        async showOprs(zikr: Zikr) {
            const actionSheet = await actionSheetController.create({
                header: this.$t('zikr.opr'),
                cssClass: 'opr-actions',
                backdropDismiss: true,
                buttons: [
                    {
                        text: this.$t('show.item.edit'),
                        icon: createOutline,
                        cssClass: 'editBtn',
                        handler: async () => {
                            this.$emit('edit', { zikr });
                        },
                    },
                    {
                        text: this.$t('show.item.share'),
                        icon: shareSocialOutline,
                        cssClass: 'shareBtn',
                        handler: async () => {
                            this.$emit('share', { body: zikr.body });
                        },
                    },
                    {
                        text: this.$t('show.item.del'),
                        icon: trashBinOutline,
                        cssClass: 'deleteBtn',
                        handler: async () => {
                            this.$emit('remove', { id: zikr.id });
                        },
                    },
                    {
                        text: this.$t('show.close'),
                        icon: closeOutline,
                        role: 'cancel',
                        cssClass: 'cancelBtn',
                    },
                ],
            });
            return await actionSheet.present();
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
