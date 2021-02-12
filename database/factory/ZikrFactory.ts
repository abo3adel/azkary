import { BaseEntity } from 'typeorm';
import { Zikr } from '../../src/entities/Zikr';
import BaseFactory from './BaseFactory';

export class ZikrFactoryClass extends BaseFactory {
    getData(): BaseEntity {
        const zikr = new Zikr();
        zikr.body = this.faker.lorem.sentence();
        zikr.count = this.faker.random.number(100);
        zikr.by_user = this.faker.random.boolean();
        return zikr;
    }
}

export const ZikrFactory: ZikrFactoryClass = new ZikrFactoryClass(
    Zikr
);
