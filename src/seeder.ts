import { CategoryType } from './entities/Category';
import { Category } from '@/entities/Category';
import { Repository } from 'typeorm';
import db from './utils/db';
import faker from 'faker';
import { ZikrFactory } from '../database/factory/ZikrFactory';
import { Zikr } from './entities/Zikr';

class Seeder {
    private catRepo!: Repository<Category>;
    async run(): Promise<void> {
        await this.seedCategories();
        return;
    }

    private async seedCategories() {
        this.catRepo = (await db()).getRepository(Category) as Repository<
            Category
        >;
        await this.createCategory(faker.lorem.sentence(), 'morning');
        await this.createCategory(faker.lorem.sentence(), 'night');
        await this.createCategory(faker.lorem.sentence(), 'mosque');
        await this.createCategory(faker.lorem.sentence(), 'wake-up');
        await this.createCategory(faker.lorem.sentence(), 'sleep');
        await this.createCategory(faker.lorem.sentence(), 'salat');
        return true;
    }

    private async createCategory(
        title: string,
        slug: string,
        type: CategoryType = CategoryType.Zikr
    ): Promise<Category> {
        const cat = new Category;
        cat.title = title;
        cat.slug = slug;
        cat.type = type;
        cat.azkar = await ZikrFactory.count(10).create() as Zikr[];

        this.catRepo.save(cat);

        return cat;
    }
}

const seeder = new Seeder();

export default seeder;