import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Solution } from '../../../solutions/solutions/entities/solution.entity';
import { Category } from '../../categories/entities/category.entity';
import { Thematic } from '../../thematics/entities/thematic.entity';
import { Image } from '../../../../utilities/images/entities/image.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column()
  started_at: Date;

  @Column()
  ended_at: Date;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Solution, (solution) => solution.event)
  solutions: Solution[];

  @ManyToMany(() => Thematic, (thematic) => thematic.events)
  @JoinTable()
  thematics: Thematic[];

  @ManyToMany(() => Category, (category) => category.events)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Image, (image) => image.events)
  @JoinTable()
  images: Image[];
}
