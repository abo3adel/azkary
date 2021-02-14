import { CategoryType } from './entities/Category';
import { Category } from '@/entities/Category';
import { getRepository, Repository } from 'typeorm';
import db, { APP_DB_NAME } from './utils/db';
import faker from 'faker';
// import clearDB from '../database/clearDB';

class Seeder {
    async run(): Promise<boolean> {
        // await clearDB(null, APP_DB_NAME)
        return await this.seedCategories();
    }

    async seedCategories() {
        const repo = (await db()).getRepository(Category) as Repository<
            Category
        >;
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                'morning',
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                'night'
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                'mosque'
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                'wake-up'
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                'sleep'
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                'salat'
            )
        );
        return true;
    }

    private getCategory(
        title: string,
        slug: string,
        type: CategoryType = CategoryType.Zikr
    ): Category {
        const cat = new Category();
        cat.title = title;
        cat.slug = slug;
        cat.type = type;

        return cat;
    }
}

const seeder = new Seeder;

export default seeder;