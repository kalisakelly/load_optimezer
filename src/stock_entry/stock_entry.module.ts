import { Module } from '@nestjs/common';
import { StockEntryService } from './stock_entry.service';
import { StockEntryController } from './stock_entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntry } from './entities/stock_entry.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StockEntry])],
  controllers: [StockEntryController],
  providers: [StockEntryService],
})
export class StockEntryModule {}
