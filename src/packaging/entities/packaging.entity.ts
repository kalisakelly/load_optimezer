// src/packaging/entities/packaging.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from "typeorm";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";
import { ProductPackage } from "src/product-package/entities/product-package.entity";

@Entity()
export class Packaging {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.packagings)
  vehicle: Vehicle;

  @ManyToOne(() => ProductPackage, (productPackage) => productPackage.packagings)
  item: ProductPackage;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdate: Date;

  @UpdateDateColumn()
  updatedate: Date;
}