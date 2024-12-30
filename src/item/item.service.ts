import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository:Repository<Item>
  ){}
  async create(ItemData: Partial<Item>): Promise<Item> {
     
    const Item = this.itemRepository.create(ItemData);
    return await this.itemRepository.save(Item);
  }

  findAll() {
    return this.itemRepository.find()
  }

  async findOne(id: number)  {
    return  await this.itemRepository.findOneBy({id})
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, updateItemDto); // Perform the update
    return this.itemRepository.findOneBy({ id }); // Fetch and return the updated entity
  }
  

  async remove(id: number, message?: string): Promise<{ message: string; deleted: boolean }> {
    try {
      const result = await this.itemRepository.delete(id);
  
      if (result.affected === 0) {
        return {
          message: `Item with ID ${id} not found.`,
          deleted: false,
        };
      }
  
      return {
        message: message || `Item with ID ${id} successfully deleted.`,
        deleted: true,
      };
    } catch (e) {
      console.error(`Error occurred: ${e.message}`);
      throw new Error(`An error occurred while deleting the item with ID ${id}.`);
    }
  }

  
  
}
