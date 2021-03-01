import { sunnyOutline, cloudyNightOutline, alarmOutline } from 'ionicons/icons';

export interface CategoryIcon {
    type: string;
    name?: string;
    color: string;
    slug?: string;
}

export default function getCategoryIcon(): CategoryIcon[] {
    return [
        // azkar
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
            color: 'warning',
            slug: 'salat',
        },
        {
            type: 'svg',
            name: 'julus',
            color: 'pink',
            slug: 'hajj',
        },
        {
            type: 'svg',
            name: 'julus',
            color: 'teal',
            slug: 'mix',
        },
        {
            type: 'svg',
            name: 'julus',
            color: 'purple',
            slug: 'ablution',
        },
        {
            type: 'svg',
            name: 'julus',
            color: 'secondary',
            slug: 'food',
        },

        // ad3ia
        {
            type: 'svg',
            name: '',
            color: 'gold',
            slug: 'quranic',
        },
        {
            type: 'svg',
            name: '',
            color: 'success',
            slug: 'prophet_mohamed',
        },
        {
            type: 'svg',
            name: '',
            color: 'purple',
            slug: 'prophets',
        },
        {
            type: 'svg',
            name: '',
            color: 'danger',
            slug: 'mix',
        },
        {
            type: 'svg',
            name: '',
            color: 'warning',
            slug: 'quran_end',
        },
        {
            type: 'svg',
            name: '',
            color: 'secondary',
            slug: 'du3a_favour',
        },
        {
            type: 'svg',
            name: '',
            color: 'pink',
            slug: 'roqia_shar3ia',
        },
        {
            type: 'svg',
            name: '',
            color: 'tertiary',
            slug: 'death',
        },
    ];
}
