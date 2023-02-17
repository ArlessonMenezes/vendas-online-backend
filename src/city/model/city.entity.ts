import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  idCity: number;
  
  @Column({ nullable: false })
  idState: number;
  
  @Column({ nullable: false })
  name: string;

  @CreateDateColumn({ type: 'datetime'  })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}