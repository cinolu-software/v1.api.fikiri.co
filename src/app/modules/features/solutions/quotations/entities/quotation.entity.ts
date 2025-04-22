import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Quotation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mention: string;

  @Column({ nullable: true, type: 'float' })
  average: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
