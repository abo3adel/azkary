import { User } from '../entities/User';
import { Connection, createConnection, getConnection } from 'typeorm';

export default async function db(): Promise<Connection> {
    let con: Connection;

    try {
        con = getConnection();
    } catch (e) {
        con = await createConnection({
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
