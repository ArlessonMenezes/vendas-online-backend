import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  idOrder: number;
  
  @Column({ nullable: false })
  idUser: number;
  
  @Column({ nullable: false })
  idAddress: number;

  @Column({ nullable: false })
  idPayment: number;

  @Column({ nullable: false })
  date: Date;
  
  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}