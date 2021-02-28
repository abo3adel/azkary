import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './BaseColumnSchema';

export interface Category {
    id: number;
    title: string;
    slug: string;
    type: string;
    azkar?: [];
    ad3ia?: [];
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
        type: {
            type: String,
            length: 10,
            nullable: true,
            default: CategoryType.Zikr,
        },
    },
    relations: {
        azkar: {
            type: 'one-to-many',
            target: 'zikr',
            inverseSide: 'category',
            onDelete: 'CASCADE',
        },
    },
    indices: [
        {
            name: 'categoey_slug_inx',
            columns: ['slug'],
            synchronize: true,
        },
        {
            name: 'category_type_inx',
            columns: ['type'],
            synchronize: true,
        }
    ]
});
