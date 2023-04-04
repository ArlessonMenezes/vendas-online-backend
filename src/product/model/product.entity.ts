import { Category } from 'src/category/model/category.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @ManyToOne(() => Category, (category) => category.products, { cascade: true })
  @JoinColumn({
    name: 'idCategory',
    referencedColumnName: 'idCategory'
  })
  category?: Category;
}