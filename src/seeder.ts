import { Du3aFactory } from './../database/factory/Du3aFactory';
import { SebhaFactory } from './../database/factory/SebhaFactory';
import { NotifyZikrFactory } from './../database/factory/NotifyZikrFactory';
import { CategoryType } from './entities/Category';
import { Category } from '@/entities/Category';
import { EntitySchema, Repository, Connection } from 'typeorm';
import db, { APP_DB_NAME } from './utils/db';
import faker from 'faker';
import { ZikrFactory } from '../database/factory/ZikrFactory';
import { Zikr } from './entities/Zikr';
import { UserFactory } from '../database/factory/UserFactory';
import { CategoryEntity } from './schema/CategoryEntity';
import { ZikrEntity, Zikr as IZikr } from './schema/ZikrEntity';
import { Du3a, Du3aEntity } from './schema/Du3aEntity';

class Seeder {
    private catRepo!: Repository<any>;
    private con!: Connection;
    async run(): Promise<void> {
        this.con = await db();
        await UserFactory.setConName(APP_DB_NAME).create();
        await this.seedCategories();
        await NotifyZikrFactory.setConName(APP_DB_NAME)
            .count(20)
            .create();
        await SebhaFactory.setConName(APP_DB_NAME)
            .count(3)
            .create();
        return;
    }

    private async seedCategories() {
        this.catRepo = (await db()).getRepository(CategoryEntity);
        // azkar
        await this.createCategory(faker.lorem.sentence(), 'morning');
        await this.createCategory(faker.lorem.sentence(), 'night');
        await this.createCategory(faker.lorem.sentence(), 'mosque');
        await this.createCategory(faker.lorem.sentence(), 'wake-up');
        await this.createCategory(faker.lorem.sentence(), 'sleep');
        await this.createCategory(faker.lorem.sentence(), 'salat');

        // du3a
        await this.createCategory(
            faker.lorem.sentence(),
            'prophet',
            CategoryType.Du3a
        );
        await this.createCategory(
            faker.lorem.sentence(),
            'quranic',
            CategoryType.Du3a
        );
        await this.createCategory(
            faker.lorem.sentence(),
            'many',
            CategoryType.Du3a
        );
        await this.createCategory(
            faker.lorem.sentence(),
            'any',
            CategoryType.Du3a
        );
        return true;
    }

    private async createCategory(
        title: string,
        slug: string,
        type: CategoryType = CategoryType.Zikr
    ): Promise<Category> {
        let cat = new Category();
        cat.title = title;
        cat.slug = slug;
        cat.type = type;
        cat = await this.catRepo.save(cat);

        let list = ZikrFactory.setConName(APP_DB_NAME)
            .count(10)
            .make() as Zikr[];
        let repo = this.con.getRepository(ZikrEntity);

        if (type === CategoryType.Du3a) {
            // @ts-ignore
            list = Du3aFactory.setConName(APP_DB_NAME)
                .count(15)
                .make();
            // @ts-ignore
            repo = this.con.getRepository(Du3aEntity);
        }

        list.forEach(async (x) => {
            x.category = cat;
            // @ts-ignore
            x.categoryId = cat.id;
            await repo.save(x);
        });

        return cat;
    }
}

const seeder = new Seeder();

export default seeder;
