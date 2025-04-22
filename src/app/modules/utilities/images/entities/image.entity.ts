import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Solution } from '../../../features/solutions/solutions/entities/solution.entity';
import { Event } from '../../../features/events/events/entities/event.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_link: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at?: Date;

  @ManyToOne(() => Solution, (solution) => solution.images)
  solution: Solution;

  @ManyToMany(() => Event, (event) => event.images)
  events: Event[];
}
