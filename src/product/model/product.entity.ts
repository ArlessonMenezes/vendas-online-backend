import { CartProduct } from 'src/cart-product/model/cart-product.entity';
import { Category } from 'src/category/model/category.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  idProduct: number;
  
  @Column({ nullable: false })
  idCategory: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column()
  image: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProducts: CartProduct[];

  @ManyToOne(() => Category, (category) => category.products, { cascade: true })
  @JoinColumn({
    name: 'idCategory',
    referencedColumnName: 'idCategory'
  })
  category?: Category;
}