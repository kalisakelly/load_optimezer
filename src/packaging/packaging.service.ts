import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Packaging } from "./entities/packaging.entity";
import { Stock } from "../stock/entities/stock.entity";
import { Item } from "../item/entities/item.entity";
import { Vehicle } from "../vehicle/entities/vehicle.entity";

@Injectable()
export class PackagingService {
  constructor(
    @InjectRepository(Packaging) private packagingRepository: Repository<Packaging>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>
  ) {}

  async loadItemToVehicle(vehicleId: number, stockId: number, itemId: number, quantity: number): Promise<any> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    // Check if the vehicle has enough capacity
    const currentLoad = 1000

    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (!item) {
      throw new Error("Item not found");
    }

    const stock = await this.stockRepository.findOne({
      where: { id: stockId },
      relations: ["stockEntries", "stockEntries.item"],
    });

    if (!stock) {
      throw new Error("Stock not found");
    }

    // Check if the stock has enough available quantity
    // const stockEntry = stock.stockEntries.find((entry) => entry.item.id === itemId);
    // if (!stockEntry || stock.available_stock < quantity) {
    //   throw new Error("Not enough stock available");
    // }

    // Create a new packaging entry
    const packaging = new Packaging();
    packaging.vehicle = vehicle;
    packaging.item = item;
    packaging.stock = stock; // Track the stock
    packaging.quantity = quantity;

    await this.packagingRepository.save(packaging);

    // Update stock
    stock.available_stock -= quantity;
    await this.stockRepository.save(stock);

    // Add the item to the vehicle's items
    // vehicle.items.push(item);
    // await this.vehicleRepository.save(vehicle);

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
}