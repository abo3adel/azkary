import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('tasabeeh')
export class Sebha extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    body!: string;

    @Column({ unsigned: true, default: 100 })
    max!: number;

    @Column({ unsigned: true, default: 0 })
    current!: number;

    @Column({ unsigned: true, default: 0 })
    readed!: number;
}
