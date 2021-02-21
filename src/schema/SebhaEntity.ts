import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './BaseColumnSchema';

export interface Sebha {
    id: number;
    body: string;
    max: number;
    current: number;
    readed: number;
}

export const SebhaEntity = new EntitySchema<Sebha>({
    name: 'sebha',
    tableName: 'tasabeeh',
    columns: {
        ...BaseColumnSchema,
        body: {
            type: String,
        },
        max: {
            type: Number,
            unsigned: true,
            default: 100,
        },
        current: {
            type: Number,
            unsigned: true,
            default: 0
        },
        readed: {
            type: Number,
            unsigned: true,
            default: 0
        }
    },
});
