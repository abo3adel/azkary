import { UserOpr } from './UserOpr';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, OneToOne} from "typeorm";

export enum UserTheme {
    Base = 'base',
    Dev =  'dev',
}

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

    @Column('float', {default: '1.0'})
    fontSize!: number;

    @Column({length: 10, default: UserTheme.Dev})
    theme!: UserTheme;
}