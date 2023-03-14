import { Address } from "src/address/model/address.entity";
import { State } from "src/state/model/state.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  idCity: number;
  
  @Column({ nullable: false })
  name: string;
  
  @Column({ nullable: false })
  idState: number;
  
  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Address, (addresses) => addresses.city)
  addresses?: Address[];

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'idState', referencedColumnName: 'idState' })
  state: State;
}