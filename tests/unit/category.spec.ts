import { Zikr } from './../../src/entities/Zikr';
import { getRepository, getConnection } from 'typeorm';
import { CategoryFactory } from './../../database/factory/CategoryFactory';
import db, { TEST_DB_NAME } from '@/utils/db';
import { Category } from '@/entities/Category';
import clearDB from '../../database/clearDB';

beforeEach(async () => await clearDB(null, TEST_DB_NAME));

it('will create one category', async () => {
    await CategoryFactory.setConName(TEST_DB_NAME).create();
    const repo = getRepository(Category, TEST_DB_NAME);
    expect(await repo.count()).toBe(1);
    expect((await repo.findOne(1))?.id).toBe(1);
});

it('have many azkar', async () => {
    const cat = await CategoryFactory.with(4).create();

    const category = await getRepository(Category, TEST_DB_NAME).findOne(1);
    expect(category?.azkar.length).toBe(4);
});
