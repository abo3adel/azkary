import { User } from '../entities/User';
import { Connection, createConnection } from 'typeorm';

export default async function db(): Promise<Connection>
{
    const con = await createConnection({
        type: 'sqljs',
        autoSave: true,
        location: 'browser',
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [
          User,
        ],
    });

    // if (!con) return;

    return con;
}