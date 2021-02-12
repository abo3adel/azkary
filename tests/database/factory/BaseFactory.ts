import { BaseEntity } from 'typeorm';
export default abstract class BaseFactory
{
    /**
     * create more than one user object
     * @param num number
     */
    static async count(num: number, conName: string = 'default'): Promise<BaseEntity[]> {
        const users: BaseEntity[] = [];
        for(let i = 0; i < num; i++) {
            users.push(await this.create(conName));
        }
        return users;
    }
}