import { BaseEntity } from 'typeorm';
import { Category } from '../../src/entities/Category';
import BaseFactory from './BaseFactory';

export class CategoryFactoryClass extends BaseFactory {
    getData(): BaseEntity {
        const category = new Category();
        const title = this.faker.lorem.sentence().substr(0, 20);
        category.title = title;
        category.slug = title.replace(/\s/gi, '-').toLowerCase();
        return category;
    }
}

export const CategoryFactory: CategoryFactoryClass = new CategoryFactoryClass(
    Category
);
