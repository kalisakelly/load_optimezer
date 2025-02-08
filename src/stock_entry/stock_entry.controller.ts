import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockEntryService } from './stock_entry.service';
import { CreateStockEntryDto } from './dto/create-stock_entry.dto';
import { UpdateStockEntryDto } from './dto/update-stock_entry.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';


@Controller('stock-entry')
export class StockEntryController {
  constructor(private readonly stockEntryService: StockEntryService) {}

  
  @Get()
  findAll() {
    return this.stockEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockEntryDto: UpdateStockEntryDto) {
    return this.stockEntryService.update(+id, updateStockEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockEntryService.remove(+id);
  }
}
