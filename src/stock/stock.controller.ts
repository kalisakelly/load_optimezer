import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }

  @Post(':stockId/load/:itemId')
  async loadItem(
    @Param('stockId') stockId: number,
    @Param('itemId') itemId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.stockService.loadItem(stockId, itemId, quantity);
  }

  @Post(':stockId/remove/:itemId')
  async removeItem(
    @Param('stockId') stockId: number,
    @Param('itemId') itemId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.stockService.removeItem(stockId, itemId, quantity);
  }

  @Get(':stockId')
  async getStockWithQuantities(@Param('stockId') stockId: number) {
    return this.stockService.getStockWithQuantities(stockId);
  }
}
