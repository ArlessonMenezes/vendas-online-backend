import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}