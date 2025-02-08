import { Injectable } from '@nestjs/common';
import { CreateStockEntryDto } from './dto/create-stock_entry.dto';
import { UpdateStockEntryDto } from './dto/update-stock_entry.dto';
import { StockEntry } from './entities/stock_entry.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StockEntryService {

  constructor(
    @InjectRepository(StockEntry) private  stockRepository: Repository<StockEntry>,

  ) {}
 

  findAll() {
    return `This action returns all stockEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockEntry`;
  }

  update(id: number, updateStockEntryDto: UpdateStockEntryDto) {
    return `This action updates a #${id} stockEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockEntry`;
  }
}
