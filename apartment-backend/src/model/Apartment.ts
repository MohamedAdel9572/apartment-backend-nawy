import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  unitName: string;

  @Column()
  unitNumber: string;

  @Column()
  project: string;

  @Column()
  description: string;
}
