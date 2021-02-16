import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from './User';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(0, 400) // we use length===0 for knowing pending feedback
  description: string;

  // one person can give multiple feedback
  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn()
  givenBy: User;

  // one person can receive multiple feedback
  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn()
  belongsTo: User;

  @Column({ nullable: true })
  givenById: string;

  @Column({ nullable: true })
  belongsToId: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
