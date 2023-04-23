import { hashSync } from "bcrypt";
import { Address } from "../../address/model/address.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "src/order/model/order.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  cpf: string;

  @Column()
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ name: 'type_user', nullable: false })
  typeUser: number;

  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Address, address => address.user)
  addresses?: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];
}