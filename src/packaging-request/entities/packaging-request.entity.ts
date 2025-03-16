// src/packaging-request/entities/packaging-request.entity.ts
import { 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 
    OneToOne 
  } from "typeorm";
  import { ProductPackage } from "src/product-package/entities/product-package.entity";
  import { Vehicle } from "src/vehicle/entities/vehicle.entity";
  
  @Entity()
  export class PackagingRequest {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(
      () => ProductPackage, 
      (productPackage) => productPackage.packagingRequest // Singular field name
    )
    product: ProductPackage; // Corrected type from Product to ProductPackage
  
    @OneToOne(
      () => Vehicle, 
      (vehicle) => vehicle.packagingRequest // Assuming Vehicle has this field
    )
    vehicle: Vehicle;
  
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
  }