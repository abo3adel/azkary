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
        let cat = new Category();
        cat.title = title;
        cat.slug = slug;
        cat.type = type;
        const azkar = ZikrFactory.setConName(APP_DB_NAME)
            .count(10)
            .make() as Zikr[];
        cat = await this.catRepo.save(cat);
        const z = this.con.getRepository(ZikrEntity);

        azkar.forEach(async (x) => {
            x.category = cat;
            // @ts-ignore
            x.categoryId = cat.id;
            await z.save(x);
        });

        return cat;
    }
}

const seeder = new Seeder();

export default seeder;
