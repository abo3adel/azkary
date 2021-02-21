import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './BaseColumnSchema';

export interface NotifyZikr {
    id: number;
    body: string;
    notifiable: boolean;
    byUser: boolean;
}

export const NotifyZikrEntity = new EntitySchema<NotifyZikr>({
    name: 'notify_zikr',
    tableName: 'notifiable_azkar',
    columns: {
        ...BaseColumnSchema,
        body: {
            type: String,
        },
        notifiable: {
            type: Boolean,
            default: true,
        },
        byUser: {
            type: Boolean,
            default: false,
        },
    },
});
