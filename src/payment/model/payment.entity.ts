import { Order } from 'src/order/model/order.entity';
import { PaymentStatus } from 'src/payment-status/model/payment-status.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from 'typeorm';

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

  @Column({ nullable: true })
  name?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.payment)
  orders?: Order[];

  @ManyToOne(() => PaymentStatus, (paymentStatus) => paymentStatus.payments)
  @JoinColumn({
    name: 'idPaymentStatus',
    referencedColumnName: 'idPaymentStatus'
  })
  paymentStatus?: PaymentStatus;

  constructor(
    idStatus: number,
    price: number,
    discount: number,
    finalPrice: number,
  ) {
    this.idStatus = idStatus;
    this.price = price;
    this.discount = discount;
    this.findalPrice = finalPrice;
  }
}