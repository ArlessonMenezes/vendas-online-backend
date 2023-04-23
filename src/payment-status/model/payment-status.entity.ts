import { Payment } from 'src/payment/model/payment.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PaymentStatus {
  @PrimaryGeneratedColumn()
  idPaymentStatus: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Payment, (payment) => payment.paymentStatus)
  payments?: Payment[]
}