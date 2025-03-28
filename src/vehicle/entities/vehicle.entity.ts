// src/vehicle/entities/vehicle.entity.ts
import { 
  Column, 
  Entity, 
  ManyToMany, 
  JoinTable, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  CreateDateColumn, 
  UpdateDateColumn, 
  JoinColumn
} from "typeorm";
import { Item } from "src/item/entities/item.entity";
import { Packaging } from "src/packaging/entities/packaging.entity";
import { User } from "src/user/entities/user.entity";
import { PackagingRequest } from "src/packaging-request/entities/packaging-request.entity";

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

  @Column({nullable:true})
  type:string;

  @OneToOne(() => User, (user) => user.drivers)
  @JoinColumn()
  driver: User;

  // Fixed ManyToMany relationship with Item
  @ManyToMany(() => Item)
  @JoinTable()
  items: Item[];

  @OneToMany(() => Packaging, (packaging) => packaging.vehicle)
  packagings: Packaging[];

  // Add inverse side for PackagingRequest relationship
  @OneToOne(
    () => PackagingRequest, 
    (packagingRequest) => packagingRequest.vehicle // Assuming this exists
  )
  packagingRequest: PackagingRequest; // Add this field

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}