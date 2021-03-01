import { Zikr } from '@/entities/Zikr';
import { actionSheetController } from '@ionic/vue';
import { prop, Vue } from 'vue-class-component';
import {
    createOutline,
    trashBinOutline,
    shareSocialOutline,
    closeOutline,
    sendOutline,
} from 'ionicons/icons';

export const EmitsList = ['decree', 'edit', 'share', 'remove', 'addToSebha'];

export class Props {
    z = prop<Zikr>({ required: true });
    color = prop<string>({ required: true });
}

export async function showOprs(zikr: Zikr, self: Vue): Promise<void> {
    const actionSheet = await actionSheetController.create({
        header: self.$t('zikr.opr'),
        cssClass: 'opr-actions',
        backdropDismiss: true,
        buttons: [
            {
                text: self.$t('show.item.addSebha'),
                icon: sendOutline,
                cssClass: 'addSebhaBtn',
                handler: async () => {
                    self.$emit('addToSebha', { zikr });
                },
            },
            {
                text: self.$t('show.item.edit'),
                icon: createOutline,
                cssClass: 'editBtn',
                handler: async () => {
                    self.$emit('edit', { zikr });
                },
            },
            {
                text: self.$t('show.item.share'),
                icon: shareSocialOutline,
                cssClass: 'shareBtn',
                handler: async () => {
                    self.$emit('share', { body: zikr.body });
                },
            },
            {
                text: self.$t('show.item.del'),
                icon: trashBinOutline,
                cssClass: 'deleteBtn',
                handler: async () => {
                    self.$emit('remove', { id: zikr.id });
                },
            },
            {
                text: self.$t('show.close'),
                icon: closeOutline,
                role: 'cancel',
                cssClass: 'cancelBtn',
            },
        ],
    });
    await actionSheet.present();
}

export function highliteText(
    txt: string,
    theme: string,
    color: string
): string {
    return txt
        .replace(
            'اللَّهُمَّ',
            `<span class='text-primary-600' style="${
                theme.indexOf('colored') > -1
                    ? `color: var(--ion-color-${color})`
                    : ''
            }">اللَّهُمَّ</span>`
        )
        .replace(
            'رَبَّنَا',
            `<span class='text-primary-600' style="${
                theme.indexOf('colored') > -1
                    ? `color: var(--ion-color-${color})`
                    : ''
            }">رَبَّنَا</span>`
        );
}
