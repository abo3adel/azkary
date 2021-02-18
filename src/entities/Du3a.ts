import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ad3ia')
export class Du3a extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    body!: string;

    @Column({default: true})
    notifiable!: boolean;

    @Column({default: false})
    byUser!: boolean;
}