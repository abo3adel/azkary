import { User } from '../entities/User';
import { Connection, createConnection, getConnection } from 'typeorm';

export default async function db(conName: string = 'default'): Promise<Connection> {
    let con: Connection;

    try {
        con = getConnection(conName);
    } catch (e) {
        con = await createConnection({
            name: conName,
            type: 'sqljs',
            autoSave: true,
            location: 'browser',
            logging: ['error', 'query', 'schema'],
            synchronize: true,
            entities: [User],
        });
    }

    return con;
}
