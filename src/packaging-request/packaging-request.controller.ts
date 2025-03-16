import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackagingRequestService } from './packaging-request.service';
import { CreatePackagingRequestDto } from './dto/create-packaging-request.dto';
import { UpdatePackagingRequestDto } from './dto/update-packaging-request.dto';

@Controller('packaging-request')
export class PackagingRequestController {
  constructor(private readonly packagingRequestService: PackagingRequestService) {}

  @Post()
  create(@Body() createPackagingRequestDto: CreatePackagingRequestDto) {
    return this.packagingRequestService.create(createPackagingRequestDto);
  }

  @Get()
  findAll() {
    return this.packagingRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagingRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackagingRequestDto: UpdatePackagingRequestDto) {
    return this.packagingRequestService.update(+id, updatePackagingRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagingRequestService.remove(+id);
  }
}
