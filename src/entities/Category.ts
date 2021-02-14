import { Zikr } from './Zikr';
import { BaseEntity, Column, Entity, Index, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum CategoryType {
    Zikr = 'zikr',
    Du3a = 'du3a',
    Any = 'any',
}

@Entity('categories')
@Index(['slug'], {unique: true})
export class Category extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 20,
    })
    title!: string;
    
    @Column({
        length: 30,
        unique: true,
        nullable: true
    })
    slug!: string;

    @Column({default: CategoryType.Zikr, length: 4})
    type!: string;

    @Column({length: 10, nullable: true})
    color!: string

    @OneToMany(() => Zikr, zikr => zikr.category, {
        eager: true,
        cascade: true,
    })
    @JoinTable()
    azkar!: Zikr[];
}