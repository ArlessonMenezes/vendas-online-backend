import { Cart } from 'src/cart/model/cart.entity';
import { Product } from 'src/product/model/product.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn()
  idCartProduct: number;

  @Column({ nullable: false })
  idCart: number;

  @Column({ nullable: false })
  idProduct: number;

  @Column({ nullable: false })
  amount: number;

  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.cartProducts)
  @JoinColumn({
    name: 'idProduct',
    referencedColumnName: 'idProduct',
  })
  product?: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  @JoinColumn({
    name: 'idCart',
    referencedColumnName: 'idCart',
  })
  cart?: Cart;
}