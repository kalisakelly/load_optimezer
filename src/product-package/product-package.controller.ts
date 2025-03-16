import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductPackageService } from './product-package.service';
import { CreateProductPackageDto } from './dto/create-product-package.dto';
import { UpdateProductPackageDto } from './dto/update-product-package.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('product-package')
// @UseGuards(AuthenticationGuard)
export class ProductPackageController {
  constructor(private readonly productPackageService: ProductPackageService) {}

  @Post()
  create(@Body() createProductPackageDto: CreateProductPackageDto) {
    return this.productPackageService.create(createProductPackageDto);
  }

  @Get()
  findAll() {
    return this.productPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductPackageDto: UpdateProductPackageDto) {
    return this.productPackageService.update(+id, updateProductPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPackageService.remove(+id);
  }

  @Patch(':id/verify')
  @HttpCode(HttpStatus.OK)
  async verifyProductPackage(
    @Param('id') id: string,
  ) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new Error('Invalid ID format');
    }

    return await this.productPackageService.verifyProductPackage(parsedId);
  }
}
