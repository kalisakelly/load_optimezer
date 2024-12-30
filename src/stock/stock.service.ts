import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { Item } from 'src/item/entities/item.entity';

@Injectable()
export class StockService {

  constructor(

    @InjectRepository(Stock) private readonly stockRepository: Repository<Stock>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,

  ) { }
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

  async loadItem(stockId: number, itemId: number, quantity: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      where: { id: stockId },
      relations: ['items'],
    });
    if (!stock) throw new NotFoundException('Stock not found');

    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item not found');

    if (stock.capacity < quantity) {
      throw new Error('Not enough capacity in the stock');
    }

    item.quantity += quantity;
    await this.itemRepository.save(item);

    if (!stock.items.includes(item)) {
      stock.items.push(item);
    }

    stock.capacity -= quantity;
    return this.stockRepository.save(stock);
  }

  async removeItem(stockId: number, itemId: number, quantity: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      where: { id: stockId },
      relations: ['items'],
    });
    if (!stock) throw new NotFoundException('Stock not found');

    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item not found');

    if (item.quantity < quantity) {
      throw new Error('Not enough items in stock');
    }

    item.quantity -= quantity;
    await this.itemRepository.save(item);

    stock.capacity += quantity;

    if (item.quantity === 0) {
      stock.items = stock.items.filter((stockItem) => stockItem.id !== itemId);
    }

    return this.stockRepository.save(stock);
  }

  async getStockWithQuantities(stockId: number): Promise<Stock> {
    return this.stockRepository.findOne({
      where: { id: stockId },
      relations: ['items'],
    });
  }
}
