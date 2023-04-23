import { Order } from 'src/order/model/order.entity';
import { Product } from 'src/product/model/product.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrdersProduct {
  @PrimaryGeneratedColumn()
  idOrdersProduct: number;

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

  @ManyToOne(() => Order, (order) => order.ordesProduct)
  @JoinColumn({ name: 'idOrder', referencedColumnName: 'idOrder' })
  order?: Order;

  @ManyToOne(() => Product, (product) => product.ordersProduct)
  @JoinColumn({ name: 'idProduct', referencedColumnName: 'idProduct' })
  product?: Product;
}