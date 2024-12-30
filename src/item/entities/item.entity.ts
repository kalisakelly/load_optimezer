import { Stock } from "src/stock/entities/stock.entity";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string
  
  @Column()
  quantity: number

  @OneToMany(() => Stock, (stock) => stock.items)
  stored: Stock
  
  @OneToMany(() => Vehicle, (vehicle) => vehicle.items)
  vehicle: Vehicle

  @Column({default: true})
  available:boolean
}
