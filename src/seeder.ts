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
                faker.lorem.slug(),
                'gold'
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                faker.lorem.slug(),
                'tertiary'
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                faker.lorem.slug(),
                'secondary'
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                faker.lorem.slug(),
                'success'
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                faker.lorem.slug(),
                'danger'
            )
        );
        await repo.insert(
            this.getCategory(
                faker.lorem.sentence(),
                faker.lorem.slug(),
                'primary'
            )
        );
        return true;
    }

    private getCategory(
        title: string,
        slug: string,
        color: string,
        type: CategoryType = CategoryType.Zikr
    ): Category {
        const cat = new Category();
        cat.title = title;
        cat.slug = slug;
        cat.type = type;
        cat.color = color;

        return cat;
    }
}

const seeder = new Seeder;

export default seeder;