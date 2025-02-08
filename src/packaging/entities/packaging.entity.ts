import { Item } from "src/item/entities/item.entity";
import { Stock } from "src/stock/entities/stock.entity";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity()
export class Packaging {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.packagings)
  vehicle: Vehicle;

  @ManyToOne(() => Item, (item) => item.packagings)
  item: Item;

  @ManyToOne(() => Stock, (stock) => stock.packagings)
  stock: Stock; 

  @Column()
  quantity: number; 

  @CreateDateColumn()
    createdate: Date;

  @UpdateDateColumn()
  updatedate: Date;
}