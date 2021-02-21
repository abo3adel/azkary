import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './BaseColumnSchema';

export interface Category {
    id: number;
    title: string;
    slug: string;
    type: string;
    azkar: [];
}

export enum CategoryType {
    Zikr = 'zikr',
    Du3a = 'du3a',
    Any = 'any',
}

export const CategoryEntity = new EntitySchema<Category>({
    name: 'category',
    tableName: 'categories',
    columns: {
        ...BaseColumnSchema,
        title: {
            type: String,
            length: 20,
        },
        slug: {
            type: String,
            length: 30,
            unique: true,
        },
    },
    relations: {
        azkar: {
            type: 'one-to-many',
            target: 'zikr',
            inverseSide: 'category',
            onDelete: 'CASCADE',
        }
    }
});
