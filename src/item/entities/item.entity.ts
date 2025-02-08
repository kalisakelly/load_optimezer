import { Packaging } from 'src/packaging/entities/packaging.entity';
import { StockEntry } from 'src/stock_entry/entities/stock_entry.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  name: string;

  @Column({ default: true })
  available: boolean;

 @ManyToOne(() => StockEntry, (stockentry) => stockentry.item)
 stockEntries: StockEntry;

 @OneToMany(() => Vehicle, (vehicle) =>vehicle.items)
 vehicle: Vehicle;

 @OneToMany(() => Packaging, (packaging) => packaging.item)
 packagings: Packaging[];

 @CreateDateColumn()
  createdate: Date;

  @UpdateDateColumn()
  updatedate: Date;
  
}