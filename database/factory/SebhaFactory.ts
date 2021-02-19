import { BaseEntity } from 'typeorm';
import { Sebha } from '../../src/entities/Sebha';
import BaseFactory from './BaseFactory';

export class SebhaFactoryClass extends BaseFactory {
    getData(): BaseEntity {
        const sebha = new Sebha();
        sebha.body = this.faker.lorem.sentence();
        sebha.current = this.faker.random.number(10);
        sebha.max = this.faker.random.number(50);
        return sebha;
    }
}

export const SebhaFactory: SebhaFactoryClass = new SebhaFactoryClass(Sebha)