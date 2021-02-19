import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('tasabeeh')
export class Sebha extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    body!: string;

    @Column({ type: 'integer', unsigned: true, default: 100 })
    max!: number;

    @Column({ type: 'integer', unsigned: true, default: 0 })
    current!: number;
}
