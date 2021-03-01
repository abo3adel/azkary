import { Du3aEntity, Du3a } from '../../src/schema/Du3aEntity';
import BaseFactory from './BaseFactory';

export class Du3aFactoryClass extends BaseFactory {
    getData(): any {
        const du3a = new Du3a();
        du3a.body = this.faker.lorem.sentence();
        du3a.meta = this.faker.random.boolean()
            ? this.faker.lorem.sentence()
            : undefined;
        return du3a;
    }
}

export const Du3aFactory: Du3aFactoryClass = new Du3aFactoryClass(Du3aEntity);
