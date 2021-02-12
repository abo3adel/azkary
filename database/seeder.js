// import { User } from '../src/entities/User';
// import { getConnection, getRepository } from 'typeorm';
// import { APP_DB_NAME, TEST_DB_NAME } from '../src/utils/db';
// import { UserFactory } from 'factory/UserFactory';
const clearDB = require('../tests/unit/clearDB')

class DatabaseSeeder {

    constructor() {
        this.clear();
        this.run();
    }

    async clear() {
        return await clearDB(null, APP_DB_NAME);
    }

    async run() {
        // return await UserFactory.setConName(APP_DB_NAME)
        // .count(10)
        // .create();
    }
}

new DatabaseSeeder();