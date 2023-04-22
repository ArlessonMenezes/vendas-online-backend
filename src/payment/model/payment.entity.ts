import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar' } })
export abstract class Payment {
  @PrimaryGeneratedColumn()
  idPayment: number;

  @Column()
  idStatus: number;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  findalPrice: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}