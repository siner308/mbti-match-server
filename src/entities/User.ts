import { Column, Entity, ManyToOne, Unique, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Group } from './Group';
import { JoinColumn } from 'typeorm';
import { MBTI } from '../enums';
import { Match } from './Match';

@Entity({ name: 'user' })
@Unique('user_name', ['groupId', 'name'])
export class User extends BaseEntity {
  @ManyToOne(() => Group, (group: Group) => group.users)
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
  group: Group;

  @Column({ type: 'uuid' })
  groupId: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 4, nullable: false })
  mbti: MBTI;

  /**
   * 기존 유저들과의 궁합
   */
  @OneToMany(() => Match, (match: Match) => match.source, { cascade: true })
  matches: Match[];
}
