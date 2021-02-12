import { Connection } from 'typeorm';
import db from '@/utils/db';
import { User } from './../../../src/entities/User';
import faker from 'faker';
import BaseFactory from './BaseFactory';

export default class UserFactory extends BaseFactory {
    /**
     * create user object without saving it
     */
    static make(): User {
        const user = new User();
        user.name = faker.name.findName();
        user.azkarCount = faker.random.number();

        return user;
    }

    /**
     * save user object into database
     */
    static async create(conName: string = 'default'): Promise<User> {
        const con = await db(conName);
        const repo = con.getRepository(User);
        const user = this.make();
        await repo.save(user);

        return user;
    }
}
