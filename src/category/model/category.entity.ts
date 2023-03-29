import { Product } from 'src/product/model/product.entity';
import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn()
  idCategory: number;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}