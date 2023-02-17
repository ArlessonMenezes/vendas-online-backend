import { hashSync } from "bcrypt";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
  typeUser: string;

  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @BeforeInsert()
  hashedPassowrd() {
    this.password = hashSync(this.password, 10)
  }
}