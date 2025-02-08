import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Item } from 'src/item/entities/item.entity';
import { StockEntry } from 'src/stock_entry/entities/stock_entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock,User,Vehicle,Item,StockEntry])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
