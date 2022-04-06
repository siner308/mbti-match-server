import { BaseEntity as TypeormEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity extends TypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
