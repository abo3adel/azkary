import { Zikr } from './Zikr';
import { BaseEntity, Column, Entity, Index, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Zikr, zikr => zikr.category, {
        eager: true,
        cascade: true,
    })
    @JoinTable()
    azkar!: Zikr[];
}