import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    // @ManyToOne()
    // azkars!: 
}