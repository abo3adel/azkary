import { CategoryEntity } from './CategoryEntity';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './BaseColumnSchema';

export interface Zikr {
    id: number;
    body: string;
    count: number;
    byUser: boolean;
    order: number;
    category: any;
}

export const ZikrEntity = new EntitySchema<Zikr>({
    name: 'zikr',
    tableName: 'azkar',
    columns: {
        ...BaseColumnSchema,
        body: {
            type: String,
        },
        count: {
            type: Number,
            default: 6,
            unsigned: true,
        },
        byUser: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            unsigned: true,
        },
    },
    relations: {
        category: {
            type: 'many-to-one',
            target: 'category',
            joinColumn: true,
        },
    },
});
