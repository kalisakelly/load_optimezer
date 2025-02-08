import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';


@Controller('stock')
@ApiTags('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiOperation({ summary: 'Create a new stock' })
  @ApiBody({ type: CreateStockDto })
  @ApiResponse({ status: 201, description: 'Stock created successfully.' })
  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @ApiOperation({ summary: 'Get all stocks' })
  @ApiResponse({ status: 200, description: 'List of all stocks.' })
  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @ApiOperation({ summary: 'Get a single stock by ID' })
  @ApiParam({ name: 'id', description: 'ID of the stock to retrieve', type: 'number' })
  @ApiResponse({ status: 200, description: 'Stock details.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an existing stock' })
  @ApiParam({ name: 'id', description: 'ID of the stock to update', type: 'number' })
  @ApiBody({ type: UpdateStockDto })
  @ApiResponse({ status: 200, description: 'Stock updated successfully.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @ApiOperation({ summary: 'Delete a stock by ID' })
  @ApiParam({ name: 'id', description: 'ID of the stock to delete', type: 'number' })
  @ApiResponse({ status: 200, description: 'Stock deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }


  @Post(':stockId/entries')
  async addStockEntry(@Param('stockId') stockId: number, @Body() body: { itemId: number; quantity: number }) {
    return this.stockService.addStockEntry(stockId, body.itemId, body.quantity);
  }

  @Get(':stockId/details')
  async getStockDetails(@Param('stockId') stockId: number) {
    return this.stockService.getStockDetails(stockId);
  }
}
