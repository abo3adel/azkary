import { BaseEntity } from 'typeorm';
import { Du3a } from '../../src/entities/Du3a';
import BaseFactory from './BaseFactory';

export class Du3aFactoryClass extends BaseFactory {
    getData(): BaseEntity {
        const du3a = new Du3a();
        du3a.body = this.faker.lorem.sentence();
        du3a.notifiable = this.faker.random.boolean();
        du3a.byUser = this.faker.random.boolean();
        return du3a;
    }
}

export const Du3aFactory: Du3aFactoryClass = new Du3aFactoryClass(Du3a)