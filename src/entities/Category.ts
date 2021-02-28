import { Zikr } from './Zikr';
import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Du3a } from '@/schema/Du3aEntity';

export enum CategoryType {
    Zikr = 'zikr',
    Du3a = 'du3a',
    Any = 'any',
}

@Entity('categories')
@Index(['slug'], { unique: true })
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 20,
    })
    title!: string;

    @Column({
        length: 30,
        unique: true,
        nullable: true,
    })
    slug!: string;

    @Column({ default: CategoryType.Zikr, length: 4 })
    type!: string;

    @OneToMany(
        () => Zikr,
        (zikr) => zikr.category,
        {
            cascade: true,
        }
    )
    @JoinTable()
    azkar!: Zikr[];

    @OneToMany(
        () => Du3a,
        (du3a) => du3a.category,
        {
            cascade: true,
        }
    )
    @JoinTable()
    ad3ia!: Du3a[];
}
