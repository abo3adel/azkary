import { BaseEntity } from 'typeorm';
import { NotifyZikr } from '../../src/entities/NotifyZikr';
import BaseFactory from './BaseFactory';

export class NotifyZikrFactoryClass extends BaseFactory {
    protected tbName = 'notifiable_azkar';

    getData(): BaseEntity {
        const du3a = new NotifyZikr();
        du3a.body = this.faker.lorem.sentence();
        du3a.notifiable = this.faker.random.boolean();
        du3a.byUser = this.faker.random.boolean();
        return du3a;
    }
}

export const NotifyZikrFactory: NotifyZikrFactoryClass = new NotifyZikrFactoryClass(NotifyZikr)