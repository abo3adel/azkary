import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './BaseColumnSchema';

export interface User {
    id: number;
    name: string;
    azkarCount: number;
    fontSize: number;
    theme: UserTheme | string;
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
    tableName: 'users',
    columns: {
        ...BaseColumnSchema,
        name: {
            type: String,
            length: 50,
        },
        azkarCount: {
            type: Number,
            unsigned: true,
        },
        fontSize: {
            type: Number,
            unsigned: true,
        },
        theme: {
            type: String,
        },
    },
});
