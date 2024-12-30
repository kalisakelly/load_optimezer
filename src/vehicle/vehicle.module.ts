import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { User } from 'src/user/entities/user.entity';
import { Stock } from 'src/stock/entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle,User,Stock])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
