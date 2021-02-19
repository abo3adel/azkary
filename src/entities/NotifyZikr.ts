import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notifiable_azkar')
export class NotifyZikr extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    body!: string;

    @Column({default: true})
    notifiable!: boolean;

    @Column({default: false})
    byUser!: boolean;
}