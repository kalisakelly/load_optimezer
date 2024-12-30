import { Item } from "src/item/entities/item.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  details: string;

  @Column()
  capacity: number;

  @OneToMany(() => Item, (item) => item.stored)
  items: Item[];

  @OneToOne(() => User, (user) => user.stock)
  @JoinColumn()
  managed_by: User;
}

