import db from '@/utils/db';
import { User } from '@/entities/User';
import UserFactory from '../database/factory/UserFactory';
import { getRepository } from 'typeorm';
import clearDB, { TEST_DB_NAME } from './clearDB';

beforeEach(async () => clearDB(User));
afterEach(async () => clearDB(User));

it('can make user object', async () => {
    const user = UserFactory.make();
    expect(user).toBeInstanceOf(User);
    expect(user.name).toBeTruthy();
    const us = await getRepository(User, TEST_DB_NAME).count();
    expect(us).toBe(0);
});

it('can create user in db', async () => {
    const user = await UserFactory.create(TEST_DB_NAME);

    const us = getRepository(User, TEST_DB_NAME);
    expect(await us.count()).toBe(1);
});

it('can create more than one user', async () => {
    const users = await UserFactory.count(5, TEST_DB_NAME);

    const us = getRepository(User, TEST_DB_NAME);
    expect(await us.count()).toBe(5);
});
