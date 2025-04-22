import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Solution } from '../../solutions/entities/solution.entity';
import { Status } from '../../status/entities/status.entity';
import { User } from '../../../../core/users/entities/user.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @Column({ type: 'varchar' })
  quotations: string;

  @ManyToMany(() => Solution, (solution) => solution.feedbacks)
  solutions: Solution[];

  @ManyToOne(() => User, (user) => user.feedbacks)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Status, (status) => status.feedbacks)
  @JoinColumn()
  status: Status;
}
