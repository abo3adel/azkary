import { BaseEntity } from 'typeorm';
import { User } from '../../src/entities/User';
import BaseFactory from './BaseFactory';

export class UserFactoryClass extends BaseFactory {
    getData(): BaseEntity {
        const user = new User();
        user.name = this.faker.name.findName();
        user.azkarCount = this.faker.random.number();
        return user;
    }
}

export const UserFactory: UserFactoryClass = new UserFactoryClass(User)