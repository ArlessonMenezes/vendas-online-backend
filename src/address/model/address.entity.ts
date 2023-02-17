import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  idAddress: number;

  @Column({ nullable: false })
  idUser: number;
  
  @Column({ nullable: false })
  idCity: number;
  
  @Column({ nullable: false })
  name: string;
  
  @Column({ nullable: true })
  complement: string;

  @Column()
  numberAddress: number;

  @Column({ nullable: false })
  cep: string;

  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}