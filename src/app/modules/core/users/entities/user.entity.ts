import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Solution } from '../../../features/solutions/solutions/entities/solution.entity';
import { Feedback } from '../../../features/solutions/feedbacks/entities/feedback.entity';
import { Pole } from '../../../features/users/poles/entities/pole.entity';
import { Organisation } from '../../../features/users/organisations/entities/organisation.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  google_image: string;

  @Column({ nullable: true })
  profile: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Solution, (solution) => solution.user)
  solutions: Solution[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @ManyToOne(() => Pole, (pole) => pole.users)
  @JoinColumn()
  pole: Pole;

  @ManyToOne(() => Organisation, (organisation) => organisation.users)
  @JoinColumn()
  organisation: Organisation;
}
