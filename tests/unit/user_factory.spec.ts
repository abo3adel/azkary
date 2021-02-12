import db from '@/utils/db';
import { User } from '@/entities/User';
import UserFactory from '../database/factory/UserFactory';
import { getRepository } from 'typeorm';

beforeEach(async () => {
    return db().then((con) => {
        const repo = con.getRepository(User);
        return repo.find().then((us) => {
            const ids = us.map((u) => u.id);
            if (!ids.length) return;
            return repo.delete(ids).then((e) => e);
        });
    });
});

describe('userFactoryTest', () => {
    it('can make user object', async () => {
        const user = UserFactory.make();
        expect(user).toBeInstanceOf(User);
        expect(user.name).toBeTruthy();
        const us = await getRepository(User).count();
        expect(us).toBe(0);
    });

    it('can create user in db', async () => {
        const user = await UserFactory.create();

        const us = getRepository(User);
        expect(await us.count()).toBe(1);
    });

    it('can create more than one user', async () => {
        const users = await UserFactory.count(5);

        const us = getRepository(User);
        expect(await us.count()).toBe(5);
    });
});
