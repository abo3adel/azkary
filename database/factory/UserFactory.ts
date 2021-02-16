import { BaseEntity } from 'typeorm';
import { User, UserTheme } from '../../src/entities/User';
import BaseFactory from './BaseFactory';

export class UserFactoryClass extends BaseFactory {
    getData(): BaseEntity {
        const user = new User();
        user.name = this.faker.name.findName();
        user.azkarCount = this.faker.random.number();
        user.fontSize = this.faker.random.float(1.2);
        user.theme = UserTheme.Dev;
        return user;
    }
}

export const UserFactory: UserFactoryClass = new UserFactoryClass(User)