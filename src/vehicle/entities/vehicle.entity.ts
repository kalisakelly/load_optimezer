import { Item } from "src/item/entities/item.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Vehicle {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  capacity: number;

  @ManyToOne(() => Item, (item) => item.vehicle)
  items: Item[];

  @OneToOne(() => User, (user) => user.drivers)
  driver: User;
 }
