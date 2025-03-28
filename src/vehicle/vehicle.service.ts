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
  async create(
    createVehicleDto: CreateVehicleDto,
    driver:User):Promise<Vehicle> {
    const createVehicle = await this.VehicleRepository.create({
     ...createVehicleDto,
     driver,
    })
    
    return this.VehicleRepository.save(createVehicle);
  }

  findAll() {
    return this.VehicleRepository.find({
      relations: ['driver'], 
    });
  }

  findOne(id: number) {
    
    return this.VehicleRepository.findOneBy({id})
  }

  // async update(id: number, updateVehicleDto: UpdateVehicleDto):Promise<Vehicle> {
    
  //   await this.VehicleRepository.update(id, updateVehicleDto);

  //   return this.VehicleRepository.findOneBy({ id });
  // }

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
}
