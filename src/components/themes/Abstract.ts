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
    const tag = (txt: any) =>
        `<span class='text-primary-600' style="${
            theme.indexOf('colored') > -1
                ? `color: var(--ion-color-${color})`
                : ''
        };font-size: var(--azkar-font-size)">${txt}</span>`;

    return txt
        .trim()
        .replace(/^اللَّهُمَّ/u, tag('اللَّهُمَّ'))
        .replace(/^اللّهُـمَّ/u, tag('اللّهُـمَّ'))
        .replace(/^اللّهـمَّ/u, tag('اللّهـمَّ'))
        .replace(/^اللَّهُمَّ/u, tag('اللَّهُمَّ'))
        .replace(/^(?:")رَبَّنَا/u, tag('رَبَّنَا'))
        .replace(/^(?:")ربَّنَا/u, tag('ربَّنَا'));
}
