import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  unitName: string;

  @Column()
  unitNumber: string;

  @Column()
  project: string;

  @Column()
  description: string;
}
