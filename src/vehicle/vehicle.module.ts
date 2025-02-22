import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { User } from 'src/user/entities/user.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Packaging } from 'src/packaging/entities/packaging.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle,User,Stock,Packaging])],
  controllers: [VehicleController],
  providers: [VehicleService,JwtService],
})
export class VehicleModule {}
