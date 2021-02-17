<template>
    <ion-item-sliding v-if="z.count > 0" class="my-2">
        <ion-item-options side="start">
            <ion-item-option color="primary" @click="share(z.body)">
                <ion-icon class="mx-1" :icon="shareSocialOutline"></ion-icon>
                <ion-label class="hidden sm:inline-block">
                    {{ $t('show.item.share') }}
                </ion-label>
            </ion-item-option>
        </ion-item-options>
        <ion-item
            @click="
                z.count--;
                onDecree(z.count, z.id);
            "
            class="select-none hover:cursor-pointer ion-activatable ripple-parent"
            :color="zinx % 2 == 0 ? 'light' : ''"
            dir="rtl"
        >
            <ion-label style="white-space: break-spaces;word-wrap: break-all;">
                {{ z.body }}
            </ion-label>
            <ion-ripple-effect></ion-ripple-effect>
            <ion-note
                slot="end"
                :color="meta.color"
                class="px-2 m-0 font-bold text-md"
            >
                {{ z.count }}
            </ion-note>
            <ion-reorder slot="end"></ion-reorder>
        </ion-item>
        <ion-item-options side="end">
            <ion-item-option
                color="secondary"
                @click="add(z.body, z.count, z.id)"
            >
                <ion-icon class="mx-1" :icon="createOutline"></ion-icon>
                <ion-label class="hidden sm:inline-block">
                    {{ $t('show.item.edit') }}
                </ion-label>
            </ion-item-option>
            <ion-item-option color="danger" @click="remove(z.id)">
                <ion-icon class="mx-1" :icon="trashBinOutline"></ion-icon>
                <ion-label class="hidden sm:inline-block">
                    {{ $t('show.item.delete') }}
                </ion-label>
            </ion-item-option>
        </ion-item-options>
    </ion-item-sliding>
</template>
<script lang="ts">
    import { Vue, prop } from 'vue-class-component';
    import { Zikr } from '@/entities/Zikr';

    class Props {
        z = prop<Zikr>({ required: true });
        zinx = prop<number>({required: true});
        meta = prop<{}>({required: true});
    }

    export default class BaseTheme extends Vue.with(Props) {}
</script>
