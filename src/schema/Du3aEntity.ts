import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './BaseColumnSchema';

export class Du3a {
    id!: number;
    body!: string;
    meta?: string;
    order!: number;
    category!: any;
}

export const Du3aEntity = new EntitySchema<Du3a>({
    name: 'du3a',
    tableName: 'ad3ia',
    columns: {
        ...BaseColumnSchema,
        body: {
            type: String,
        },
        meta: {
            type: String,
            nullable: true,
        },
        order: {
            type: Number,
            unsigned: true,
            nullable: true,
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
