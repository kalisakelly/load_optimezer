import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Req, BadRequestException } from '@nestjs/common';
import { ProductPackageService } from './product-package.service';

import { CreateProductPackageDto } from './dto/create-product-package.dto';
import { UpdateProductPackageDto } from './dto/update-product-package.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('product-package')
export class ProductPackageController {
  constructor(private readonly productPackageService: ProductPackageService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  create(@Body() createProductPackageDto: CreateProductPackageDto , @Req() req: any) {
    
   try{
    const user = req.user.id;
    return this.productPackageService.create(createProductPackageDto , user);
   }
   catch(err) {

    console.error('Error creating user details:', err);
    throw new BadRequestException('Validation failed or other error');

   }

  }

  @Get()
  findAll() {
    return this.productPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPackageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductPackageDto: UpdateProductPackageDto) {
    return this.productPackageService.update(id, updateProductPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPackageService.remove(id);
  }

  @Patch(':id/verify')
  @HttpCode(HttpStatus.OK)
  async verifyProductPackage(
    @Param('id') id: string,
  ) {
    // const parsedId = parseInt(id, 10);
    if (id) {
      throw new Error('Invalid ID format');
    }

    return await this.productPackageService.verifyProductPackage(id);
  }

  @Patch(':id/deliver')
  @HttpCode(HttpStatus.OK)
  async packagedelivery(
    @Param('id') id: string,
  ) {
    // const parsedId = parseInt(id, 10);
    if (id) {
      throw new Error('Invalid ID format');
    }

    return await this.productPackageService.deliverProductPackage(id);
  }

  @Get('my-packages')
  async findAllByUser(@Req() req: any) {
    const user = req.user.id; // Extract the user from the request
    return await this.productPackageService.findAllByUser(user.id); // Pass the user ID to the service
  }
}
