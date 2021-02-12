import UserFactory from '../database/factory/UserFactory';

it('will seed database', async () => {
    const users = await UserFactory.count(5);

    expect(true).toBeTruthy();
});