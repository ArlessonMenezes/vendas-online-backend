import { hashSync } from "bcrypt";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @BeforeInsert()
  hashedPassowrd() {
    this.password = hashSync(this.password, 10)
  }
}