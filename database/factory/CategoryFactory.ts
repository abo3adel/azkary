import { Zikr } from './../../src/entities/Zikr';
import { ZikrFactory } from './ZikrFactory';
import { BaseEntity, Repository } from 'typeorm';
import { Category, CategoryType } from '../../src/entities/Category';
import BaseFactory from './BaseFactory';

export class CategoryFactoryClass extends BaseFactory {
    getData(): BaseEntity {
        const category = new Category();
        const title = this.faker.lorem.sentence().substr(0, 20);
        category.title = title;
        category.slug = title.replace(/\s/gi, '-').toLowerCase();
        category.type = this.faker.random.objectElement(CategoryType) as CategoryType;
        category.color = this.faker.random.arrayElement([
            'gold',
            'primary',
            'danger',
            'tertiary',
            'secondary',
            'success',
            'warning',
        ]);
        return category;
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
        const azkar = (ZikrFactory.count(this.relationsSize).make()) as Zikr[];
        (entity as Category).azkar = azkar;
        entity = await repo.save(entity);
        return entity;
    }
}

export const CategoryFactory: CategoryFactoryClass = new CategoryFactoryClass(
    Category
);
