import clearDB from '../../database/clearDB';
import { TEST_DB_NAME } from '@/utils/db';
import { Zikr } from './../../src/entities/Zikr';
import { getRepository } from 'typeorm';
import { ZikrFactory } from './../../database/factory/ZikrFactory';

beforeEach(async () => await clearDB());

it('zikr body supports arabic langague', async () => {
    const zikr = ZikrFactory.make() as Zikr;
    const title = 'الحمد لله';
    zikr.body = title;
    await ZikrFactory.create(zikr);

    const repo = getRepository(Zikr, TEST_DB_NAME);
    const count = await repo.count();
    const first = (await repo.findOne(1));
    expect(count).toBe(1);
    expect(first?.body).toBe(title);
});

// it('zikr belongs to category')
