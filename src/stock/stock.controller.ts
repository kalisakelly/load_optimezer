import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';


@Controller('stock')
@ApiTags('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiOperation({ summary: 'Create a new stock' })
  @ApiBody({ type: CreateStockDto })
  @ApiResponse({ status: 201, description: 'Stock created successfully.' })
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('logistics', 'admin')
  @ApiSecurity('jwt')
  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  // @ApiOperation({ summary: 'Get all stocks' })
  // @ApiResponse({ status: 200, description: 'List of all stocks.' })
  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles('logistics', 'admin')
  // @ApiSecurity('jwt')
  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @ApiOperation({ summary: 'Get a single stock by ID' })
  @ApiParam({ name: 'id', description: 'ID of the stock to retrieve', type: 'number' })
  @ApiResponse({ status: 200, description: 'Stock details.' })
  @Get(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('logistics', 'admin')
  @ApiSecurity('jwt')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an existing stock' })
  @ApiParam({ name: 'id', description: 'ID of the stock to update', type: 'number' })
  @ApiBody({ type: UpdateStockDto })
  @ApiResponse({ status: 200, description: 'Stock updated successfully.' })
  @Patch(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('logistics', 'admin')
  @ApiSecurity('jwt')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @ApiOperation({ summary: 'Delete a stock by ID' })
  @ApiParam({ name: 'id', description: 'ID of the stock to delete', type: 'number' })
  @ApiResponse({ status: 200, description: 'Stock deleted successfully.' })
  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('logistics', 'admin')
  @ApiSecurity('jwt')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }


  @Post(':stockId/entries')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('logistics', 'admin')
  @ApiSecurity('jwt')
  async addStockEntry(@Param('stockId') stockId: number, @Body() body: { itemId: number; quantity: number }) {
    return this.stockService.addStockEntry(stockId, body.itemId, body.quantity);
  }

  @Get(':stockId/details')
  async getStockDetails(@Param('stockId') stockId: number) {
    return this.stockService.getStockDetails(stockId);
  }
}
