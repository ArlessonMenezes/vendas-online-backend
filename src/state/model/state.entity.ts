import { City } from "../../city/model/city.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  idState: number;
  
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  uf: string;

  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => City, (cities) => cities.state)
  cities?: City[];
}