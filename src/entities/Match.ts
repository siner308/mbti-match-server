import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { MatchScore } from '../enums';

@Entity('match')
export class Match extends BaseEntity {
  /**
   * 추가하는 사람
   */
  @ManyToOne(() => User, (user: User) => user.matches)
  @JoinColumn({ name: 'sourceId', referencedColumnName: 'id' })
  source: User;

  @Column({ type: 'uuid', nullable: false })
  sourceId: string;

  @Column({ type: 'varchar', nullable: false })
  score: MatchScore;

  /**
   * 이미 추가되어있는 사람들
   */
  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'targetId', referencedColumnName: 'id' })
  target: User;

  @Column({ type: 'uuid', nullable: false })
  targetId: string;
}
