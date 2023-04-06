import { CartProduct } from "src/cart-product/model/cart-product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  idCart: number;

  @Column()
  idUser: number;

  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  cartProducts?: CartProduct[];

}