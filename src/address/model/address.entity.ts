import { City } from 'src/city/model/city.entity';
import { User } from 'src/user/model/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  idAddress: number;

  @Column({ nullable: false })
  idUser: number;
  
  @Column({ nullable: false })
  idCity: number;
  
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

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  user?: User;

  @ManyToOne(() => City, (city) => city.addresses)
  @JoinColumn({ name: 'idCity', referencedColumnName: 'idCity' })
  city?: City;
}