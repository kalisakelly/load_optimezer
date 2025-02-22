import { Module } from '@nestjs/common';
import { PackagingService } from './packaging.service';
import { PackagingController } from './packaging.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Packaging } from './entities/packaging.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Item } from 'src/item/entities/item.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Packaging,Stock,Item,Vehicle])],
  controllers: [PackagingController],
  providers: [PackagingService,JwtService],
})
export class PackagingModule {}
