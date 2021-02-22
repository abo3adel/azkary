import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './BaseColumnSchema';

export enum Fonts {
    Base = 'Cairo',
    Amiri = 'AmiriQuranColored',
    Hafs = 'UthmanicHafs-Ver16',
    Tajawal = 'Tajawal-Regular',
    Mirza = 'Mirza-Regular',
    Ruqaa = 'ArefRuqaa-Regular',
}

export interface AzkarCount {
    Long: 32;
    Short: 5;
}

export interface User {
    id: number;
    // user
    azkarCount: number;

    // app
    fontSize: number;
    fontType: Fonts | string;
    azkarFont: Fonts | string;
    theme: UserTheme | string;
    dark: boolean;

    // sebha
    // sebhaBg: string;
    sebhaAutoNext: boolean;

    // control
    sound: boolean;
    vibration: boolean;
    hardKeys: boolean;
    touch: boolean;
    keyboard: boolean; // desctop-only

    // azkar
    enabled: boolean;
    morning: string;
    night: string;
    notifyCount: AzkarCount;
    autoHide: boolean; // desctop-only
}

export enum UserTheme {
    Base = 'base',
    DevColored = 'dev-colored',
    Dev = 'dev',
    SlideColored = 'slide-colored',
    Slide = 'slide',
}

export const UserEntity = new EntitySchema<User>({
    name: 'user',
    tableName: 'user_settings',
    columns: {
        ...BaseColumnSchema,
        // user
        azkarCount: {
            type: Number,
            unsigned: true,
            default: 0,
        },

        // app
        fontSize: {
            type: Number,
            unsigned: true,
            default: 1.1,
        },
        fontType: {
            type: String,
            default: Fonts.Base,
        },
        azkarFont: {
            type: String,
            default: Fonts.Amiri,
        },
        theme: {
            type: String,
            length: 30,
            default: UserTheme.DevColored,
        },
        dark: {
            type: Boolean,
            default: false,
        },

        // sebha
        sebhaAutoNext: {
            type: Boolean,
            default: true,
        },

        // control
        sound: {
            type: Boolean,
            default: false,
        },
        vibration: {
            type: Boolean,
            default: true,
        },
        hardKeys: {
            type: Boolean,
            default: true,
        },
        touch: {
            type: Boolean,
            default: true,
        },
        keyboard: {
            type: Boolean,
            default: true,
        },

        // azkar - notify
        enabled: {
            type: Boolean,
            default: true,
        },
        morning: {
            type: String,
            nullable: true,
            default: '2021-02-22T06:30:46.789',
        },
        night: {
            type: String,
            nullable: true,
            default: '2021-02-22T17:30:46.789'
        },
        notifyCount: {
            type: String,
            nullable: true,
            default: 13,
        },
        autoHide: {
            type: Boolean,
            default: true,
        },
    },
});
