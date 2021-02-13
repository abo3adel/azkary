import { Category } from '@/entities/Category';
import { BaseEntity, Repository } from 'typeorm';
import { Zikr } from '../../src/entities/Zikr';
import BaseFactory from './BaseFactory';
import { CategoryFactory } from './CategoryFactory';

export class ZikrFactoryClass extends BaseFactory {
    getData(): BaseEntity {
        const zikr = new Zikr();
        zikr.body = this.faker.lorem.sentence();
        zikr.count = this.faker.random.number(100);
        zikr.byUser = this.faker.random.boolean();
        zikr.order = this.faker.random.number(50);
        return zikr;
    }

    
    /**
     * add relations to this entity instance and save it
     * @param entity BaseEntity
     * @param repo Repository<BaseEntity>
     */
    protected async addRelations(
        entity: BaseEntity,
        repo: Repository<BaseEntity>
    ): Promise<BaseEntity> {
        const category = (await CategoryFactory.create()) as Category;
        (entity as Zikr).category = category;
        await repo.save(entity);
        return entity;
    }
}

export const ZikrFactory: ZikrFactoryClass = new ZikrFactoryClass(Zikr);
