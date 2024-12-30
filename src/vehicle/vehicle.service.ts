import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(
  
      @InjectRepository(Vehicle) private readonly VehicleRepository: Repository<Vehicle>,
    ) { }
  async create(createVehicleDto: CreateVehicleDto):Promise<Vehicle> {
    return this.VehicleRepository.save(createVehicleDto);
  }

  findAll() {
    return this.VehicleRepository.find();
  }

  findOne(id: number) {
    
    return this.VehicleRepository.findOneBy({id})
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto):Promise<Vehicle> {
    
    await this.VehicleRepository.update(id, updateVehicleDto);

    return this.VehicleRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.VehicleRepository.delete(id);
  }
}
