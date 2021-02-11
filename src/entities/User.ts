import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        default: '',
        nullable: true,
        length: 50,
    })
    name!: string;

    @Column({
        default: 0,
        unsigned: true,
    })
    azkarCount!: number;
}