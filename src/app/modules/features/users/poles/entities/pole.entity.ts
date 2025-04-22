import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Solution } from '../../../solutions/solutions/entities/solution.entity';
import { User } from '../../../../core/users/entities/user.entity';

@Entity()
export class Pole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at?: Date;

  @OneToMany(() => Solution, (solution) => solution.pole)
  solutions: Solution[];

  @OneToMany(() => User, (user) => user.pole, { nullable: true })
  users: User[];
}
