import { Connection } from 'typeorm';
import db from '@/utils/db';
import { User } from './../../../src/entities/User';
import faker from 'faker';

export default class UserFactory {
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
    static async create(): Promise<User> {
        const con = await db();
        const repo = con.getRepository(User);
        const user = this.make();
        await repo.save(user);

        return user;
    }

    /**
     * create more than one user object
     * @param num number
     */
    static async count(num: number): Promise<User[]> {
        const users: User[] = [];
        for(let i = 0; i < num; i++) {
            users.push(await this.create());
        }
        return users;
    }
}
