import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Packaging } from "./entities/packaging.entity";
import { Vehicle } from "../vehicle/entities/vehicle.entity";
import { ProductPackage } from "src/product-package/entities/product-package.entity";

@Injectable()
export class PackagingService {
  constructor(
    @InjectRepository(Packaging) private packagingRepository: Repository<Packaging>,
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(ProductPackage) private productPackageRepository: Repository<ProductPackage>
  ) {}

  async loadItemToVehicle(
    vehicleId: number,
    itemId: string,
    // quantity: number
  ): Promise<any> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId },
    });
  
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
  
    // Fetch the ProductPackage (item)
    const productPackage = await this.productPackageRepository.findOne({
      where: { id: itemId },
    });
  
    if (!productPackage) {
      throw new Error("ProductPackage not found");
    }
  
    // Check available quantity
    // if (productPackage.quantity < quantity) {
    //   throw new Error("Not enough quantity available");
    // }
  
    // Create new Packaging entry
    const packaging = new Packaging();
    packaging.vehicle = vehicle;
    packaging.item = productPackage; 
    packaging.quantity = productPackage.quantity;

    if (vehicle.space_available >= productPackage.quantity){
      vehicle.space_available -= productPackage.quantity;
    } else {
      throw new Error("Vehicle capacity exceeded");
    }

    await this.vehicleRepository.save(vehicle);
    
    await this.packagingRepository.save(packaging);
  
    productPackage.quantity -= productPackage.quantity;
    if (productPackage.quantity === 0) {
      productPackage.completed = true;
    }
  
    await this.productPackageRepository.save(productPackage);

  
    return { message: "Item loaded successfully" };
  }

  calculateVehicleLoad(vehicle: Vehicle): number {
    return vehicle.packagings.reduce((total, packaging) => total + packaging.quantity, 0);
  }

  // async getAllVehiclesWithItems() {
  //   return this.vehicleRepository.find({
  //     relations: ["items", "packagings", "packagings.stock", "packagings.item"],
  //   });
  // }

  async getVehicleWithItems(vehicleId: number): Promise<Vehicle> {
    // Fetch the vehicle with its related items and packagings
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId },
      
    });

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    return vehicle;
  }

  async CountPackaging(){

    const result = this.packagingRepository.count()

    return result
  }

  async findall() {
    return this.packagingRepository.find({
      relations: ['vehicle', 'item'], // Using 'item' instead of 'productPackage'
    });
  }
}