import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Item,Vehicle,Stock])],
  controllers: [ItemController],
  providers: [ItemService,JwtService],
})
export class ItemModule {}
