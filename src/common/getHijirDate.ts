import { DateTime } from 'luxon';

export const HIJIR_MONTHS_AR = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الثاني',
    'جمادى الأولى',
    'جمادى الثانية',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
];

export const HIJIR_MONTHS_EN = [
    'Moharram',
    'Safar',
    'Rabie-I',
    'Rabie-II',
    'Jumada-I',
    'Jumada-II',
    'Rajab',
    'Shaban',
    'Ramadan',
    'Shawwal',
    'Delqada',
    'Delhijja',
];

export default function getHijirDate(lang = 'ar') {
    // @ts-ignore
    const hijir = window.HijriJS.today();
    const day = DateTime.now()
        .setLocale(lang)
        .toFormat('EEE');

    const num = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US');
    let date = `${day} ${num.format(hijir.day)} `;

    date +=
        lang === 'ar'
            ? HIJIR_MONTHS_AR[hijir.month - 1]
            : HIJIR_MONTHS_EN[hijir.month - 1];

    date += ` ${num.format(hijir.year).replace('٬', '').replace(',', '')} `;

    return date;
}
