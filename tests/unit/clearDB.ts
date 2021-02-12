import db from '@/utils/db';
import { BaseEntity, EntityTarget } from 'typeorm';

export const TEST_DB_NAME = 'test';

export default async function clearDB(entity: EntityTarget<BaseEntity>, conName: string = TEST_DB_NAME) {
    const con = await db(conName);
    return await con.getRepository(entity).clear();
}
