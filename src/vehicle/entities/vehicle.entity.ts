import { Item } from "src/item/entities/item.entity";
import { Packaging } from "src/packaging/entities/packaging.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, JoinTable, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";

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

  @OneToOne(() => User, (user) => user.drivers)
  driver: User;

  // Add a many-to-many relationship with Item
  @ManyToOne(() => Item, (item) => item.vehicle)
  @JoinTable()
  items: Item[];

  @OneToMany(()=>Packaging,(packagings) => packagings.vehicle)
  packagings: Packaging[];

  @CreateDateColumn()
   createdate: Date;

  @UpdateDateColumn()
  updatedate: Date;

}