import { Category } from '@/entities/Category';
import { BaseEntity, Repository, InsertResult } from 'typeorm';
import { Zikr } from '../../src/entities/Zikr';
import BaseFactory from './BaseFactory';
import { CategoryFactory } from './CategoryFactory';

export class ZikrFactoryClass extends BaseFactory {
    protected tbName = 'azkar';

    getData(): BaseEntity {
        const zikr = new Zikr();
        zikr.body = this.faker.lorem.sentence();
        zikr.count = 1;
        zikr.byUser = this.faker.random.boolean();
        zikr.order = this.faker.random.number(100);
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
    ): Promise<BaseEntity | InsertResult> {
        const category = (await CategoryFactory.create()) as Category;
        // @ts-ignore
        entity.categoryId = category.id;
        // await repo.save(entity);
        // @ts-ignore
        entity = await this.saveEntity(repo, entity, this.tbName);
        return entity;
    }
}

export const ZikrFactory: ZikrFactoryClass = new ZikrFactoryClass(Zikr);
