import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Packaging } from 'src/packaging/entities/packaging.entity';

@Injectable()
export class VehicleService {
  constructor(
  
      @InjectRepository(Vehicle) private readonly VehicleRepository: Repository<Vehicle>,
    ) { }
    async create(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
      const vehicle = this.VehicleRepository.create(vehicleData);
      return await this.VehicleRepository.save(vehicle);
    }

  findAll() {
    return this.VehicleRepository.find({
      relations: ['driver'], 
    });
  }

  findOne(id: number) {
    
    return this.VehicleRepository.findOneBy({id})
  }

  async update(id: number, updateVehicleDto: Partial<Vehicle>):Promise<Vehicle> {
    
    await this.VehicleRepository.update(id, updateVehicleDto);

    return this.VehicleRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.VehicleRepository.delete(id);
  }

  async getPackagingsByDriver(driverId: number): Promise<Packaging[]> {
    const vehicle = await this.VehicleRepository.findOne({
      where: { driver: { userid: driverId } }, 
      relations: ['packagings', 'packagings.item'],
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle assigned to the driver not found');
    }

    
    return vehicle.packagings;
  }

  async allowVehicle(id: number) {
    const packageToVerify = await this.VehicleRepository.findOneBy({ id });

    if (!packageToVerify) {
      throw new Error(`Vehicle with id ${id} not found`);
    }

    packageToVerify.isinmotion = true;
    await this.VehicleRepository.save(packageToVerify);

    return packageToVerify;
  }

  async reloadVehicle(id: number) {
    const packageToVerify = await this.VehicleRepository.findOneBy({ id });

    if (!packageToVerify) {
      throw new Error(`Vehicle with id ${id} not found`);
    }

    packageToVerify.space_available = packageToVerify.capacity;
    packageToVerify.isinmotion = false

    await this.VehicleRepository.save(packageToVerify);

    return packageToVerify;
  }

  async getCountVehicle(){

    const result = this.VehicleRepository.count()

    return result
  }

  
}
