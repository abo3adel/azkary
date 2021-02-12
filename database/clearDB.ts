import db, { TEST_DB_NAME, ENTITIES } from '@/utils/db';
import { BaseEntity, EntityTarget } from 'typeorm';

export default async function clearDB(
    entity: EntityTarget<BaseEntity> | null = null,
    conName: string = TEST_DB_NAME
) {
    if (process.env.NODE_ENV === 'test') {
        const nrc = require('node-run-cmd');
        await nrc.run('rm -rf browser');
    }

    const con = await db(conName);
    if (null !== entity) {
        return await con
            .getRepository(entity as EntityTarget<BaseEntity>)
            .clear();
    }

    for (let ent of ENTITIES) {
        const tableName = con.getMetadata(ent).tableName;
        await con.query(`DELETE FROM ${tableName}`);
        await con.query(`
        DELETE FROM SQLITE_SEQUENCE WHERE name = '${tableName}'`);
        // console.error("asdasd asd".repeat(90));
        // console.log(await (con.getRepository(ent).count()), conName);
    }

    return;
}
