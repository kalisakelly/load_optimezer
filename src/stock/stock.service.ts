import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { Item } from 'src/item/entities/item.entity';
import { StockEntry } from 'src/stock_entry/entities/stock_entry.entity';

@Injectable()
export class StockService {

  constructor(
    @InjectRepository(StockEntry) private stockEntryRepository: Repository<StockEntry>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}
  async create(StockData: Partial<Stock>): Promise<Stock> {
    
    const new_stock = await this.stockRepository.save(StockData);

    return new_stock;
  }

  findAll() {
    return this.stockRepository.find();
  }

  findOne(id: number) {
    return this.stockRepository.findOneBy({ id });
  }

  async update(id: number, updateStockDto: UpdateStockDto): Promise<Stock> {
    
    await this.stockRepository.update(id, updateStockDto);

    return this.stockRepository.findOneBy({ id });
  }

  async remove(id: number, message?: string): Promise<{ message: string; deleted: boolean }> {
    try {
      const result = await this.stockRepository.delete(id);
  
      if (result.affected === 0) {
        return {
          message: `stock with ID ${id} not found.`,
          deleted: false,
        };
      }
  
      return {
        message: message || `stock with ID ${id} successfully deleted.`,
        deleted: true,
      };
    } catch (e) {
      console.error(`Error occurred: ${e.message}`);
      throw new Error(`An error occurred while deleting the stock with ID ${id}.`);
    }
  }


  async addStockEntry(stockId: number, itemId: number, quantity: number): Promise<any> {
    const stock = await this.stockRepository.findOne({
      where: { id: stockId },
      // relations: ['stockEntries', 'stockEntries.item'],
    });

    if (!stock) {
      throw new Error('Stock not found');
    }

    if (stock.available_stock + quantity > stock.capacity) {
      throw new Error('Exceeds stock capacity');
    }

    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (!item) {
      throw new Error('Item not found');
    }

    const stockEntry = new StockEntry();
    stockEntry.item = item;
    stockEntry.stock = stock;
    stockEntry.quantity = quantity;

    await this.stockEntryRepository.save(stockEntry);

    // Update available_stock in the stock
    stock.available_stock = (stock.available_stock || 0) + quantity;
    await this.stockRepository.save(stock);

    return { message: 'Stock entry added successfully' };
  }

  async getStockDetails(stockId: number): Promise<any> {
    const stock = await this.stockRepository.findOne({
      where: { id: stockId },
      relations: ['stockEntries', 'stockEntries.item'],
    });

    if (!stock) {
      throw new Error('Stock not found');
    }

    const itemsInStock = stock.stockEntries.map((entry) => ({
      itemId: entry.item.id,
      itemName: entry.item.name,
      quantity: entry.quantity,
    }));

    return {
      stockName: stock.name,
      capacity: stock.capacity,
      availableStock: stock.available_stock,
      items: itemsInStock,
    };
  }
  async removefromstock(stockId: number, itemId: number, quantity: number): Promise<any> {

    const stock = await this.stockRepository.findOne({
      where: { id: stockId },
    });
    if (!stock) {
      throw new Error('Stock not found');
    }
    const item = await this.itemRepository.findOne({ where: { id: itemId } });

    
  
  }

}


