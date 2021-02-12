import { getRepository, getConnection } from 'typeorm';
import { CategoryFactory } from './../../database/factory/CategoryFactory';
import { TEST_DB_NAME } from '@/utils/db';
import { Category } from '@/entities/Category';
import clearDB from '../../database/clearDB';

beforeEach(async () => await clearDB(Category, TEST_DB_NAME));

it('will create one category', async () => {
    await CategoryFactory.setConName(TEST_DB_NAME).create();
    const repo = getRepository(Category, TEST_DB_NAME);
    expect(await repo.count()).toBe(1);
    expect((await repo.findOne(1))?.id).toBe(1);
});
