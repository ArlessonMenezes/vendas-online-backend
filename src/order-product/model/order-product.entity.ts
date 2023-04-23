import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  idOrderProduct: number;

  @Column()
  idOrder: number;

  @Column()
  idProduct: number;
  
  @Column({ nullable: false })
  amount: number;
  
  @Column({ nullable: false })
  price: number;
  
  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}