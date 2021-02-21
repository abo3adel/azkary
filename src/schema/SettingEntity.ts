import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './BaseColumnSchema';

export interface Setting {
    id: number;
    sebhaBg: string;
    sebhaNext: boolean;
    
}

export const SettingEntity = new EntitySchema<Setting>({
    name: 'setting',
    tableName: 'user_settings',
    columns: {
        ...BaseColumnSchema,
    }
});
