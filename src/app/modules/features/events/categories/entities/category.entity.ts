import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class Category {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @CreateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @ManyToMany(() => Event, (event) => event.categories)
  events: Event[];
}
