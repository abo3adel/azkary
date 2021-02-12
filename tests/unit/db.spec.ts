import db from '@/utils/db';
import { Connection } from 'typeorm';

describe('DataBase', () => {
    it('it will connect to db', async () => {
        const con = await db().then(r => r).catch(e => e) as Connection;

        expect(con).toBeInstanceOf(Connection);
    });

    it('it will not fail to connetion alerady alive', async () => {
        const con = await db().then(r => r).catch(e => e) as Connection;

        expect(con).toBeInstanceOf(Connection);
    });
});