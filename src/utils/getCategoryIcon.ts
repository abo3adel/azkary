import { sunnyOutline, cloudyNightOutline, alarmOutline } from 'ionicons/icons';

export interface CategoryIcon {
    type: string;
    name?: string;
    color: string;
    slug?: string;
}

export default function getCategoryIcon(): CategoryIcon[] {
    return [
        {
            type: 'icon',
            name: sunnyOutline,
            color: 'gold',
            slug: 'morning',
        },
        {
            type: 'icon',
            name: cloudyNightOutline,
            color: 'tertiary',
            slug: 'night',
        },
        {
            type: 'svg',
            name: 'mosque',
            color: 'secondary',
            slug: 'mosque',
        },
        {
            type: 'icon',
            name: alarmOutline,
            color: 'success',
            slug: 'wake-up',
        },
        {
            type: 'svg',
            name: 'half-moon',
            color: 'danger',
            slug: 'sleep',
        },
        {
            type: 'svg',
            name: 'julus',
            color: 'primary',
            slug: 'salat',
        },
    ];
}
