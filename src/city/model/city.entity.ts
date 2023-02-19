import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}