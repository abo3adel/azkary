import { User } from './../../src/entities/User';
import { APP_DB_NAME, TEST_DB_NAME } from '../../src/utils/db';
import { getRepository } from 'typeorm';
import { UserFactory } from '../database/factory/UserFactory';
import clearDB from './clearDB';

beforeAll(async () => {
    await clearDB(null, APP_DB_NAME);
    return;
});

it('will seed database', async () => {
    const users = await UserFactory.setConName(APP_DB_NAME)
        .count(5)
        .create();
});
