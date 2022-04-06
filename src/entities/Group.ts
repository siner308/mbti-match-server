import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity('group')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @OneToMany(() => User, (user: User) => user.group, { cascade: true })
  users: User[];

  @CreateDateColumn()
  createdAt: Date;
}
