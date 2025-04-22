import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Solution } from '../../solutions/entities/solution.entity';
import { Feedback } from '../../feedbacks/entities/feedback.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Feedback, (feedback) => feedback.status)
  feedbacks: Feedback[];

  @OneToMany(() => Solution, (solution) => solution.status)
  solutions: Solution[];
}
