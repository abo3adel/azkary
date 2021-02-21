import { SebhaEntity } from './../schema/SebhaEntity';
import { UserEntity } from '../schema/UserEntity';
import { isPlatform } from '@ionic/vue';
// import { Sebha } from './../entities/Sebha';
// import { NotifyZikr } from '../entities/NotifyZikr';
// import { Zikr } from './../entities/Zikr';
// import { Category } from './../entities/Category';
// import { User } from '../entities/User';
import { Connection, createConnection, getConnection } from 'typeorm';
import { CategoryEntity } from '@/schema/CategoryEntity';
import { ZikrEntity } from '@/schema/ZikrEntity';
import { NotifyZikrEntity } from '@/schema/NotifyZikrEntity';

export const TEST_DB_NAME = 'test';
export const APP_DB_NAME = 'default';
export const ENTITIES = [UserEntity, CategoryEntity, ZikrEntity, NotifyZikrEntity, SebhaEntity];

export default async function db(conName = APP_DB_NAME): Promise<Connection> {
    let con: Connection;

    try {
        con = getConnection(conName);
    } catch (e) {
        if (isPlatform('cordova')) {
            con = await createConnection({
                name: conName,
                type: 'cordova',
                database: 'my_azkar_db',
                location: 'default',
                logging: ['error', 'query', 'schema'],
                synchronize: true,
                entities: ENTITIES,
            });
        } else {
            con = await createConnection({
                name: conName,
                type: 'sqljs',
                autoSave: true,
                location: 'browser',
                logging: ['error', 'query', 'schema'],
                synchronize: true,
                entities: ENTITIES,
            });
        }
    }

    return con;
}
