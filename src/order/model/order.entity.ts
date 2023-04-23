import { Address } from 'src/address/model/address.entity';
import { OrdersProduct } from 'src/order-product/model/order-product.entity';
import { Payment } from 'src/payment/model/payment.entity';
import { User } from 'src/user/model/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  user?:User;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: 'idAddress', referencedColumnName: 'idAddress' })
  address?: Address;

  @ManyToOne(() => Payment, (payment) => payment.orders)
  @JoinColumn({ name: 'idPayment', referencedColumnName: 'idPayment' })
  payment?: Payment;

  @OneToMany(() => OrdersProduct, (ordersProduct=> ordersProduct.order))
  ordesProduct?: OrdersProduct[];
}