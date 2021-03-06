import { Zikr } from '@/entities/Zikr';
import { prop } from 'vue-class-component';

export const EmitsList = ['decree', 'opts'];

export class Props {
    z = prop<Zikr>({ required: true });
    color = prop<string>({ required: true });
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
