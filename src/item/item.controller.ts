import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private  itemService: ItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiBody({ schema:{
    type:'object',
    properties:{
      name:{type:'string'}
    },
    required:['name']
  } })
  @ApiResponse({ status: 200, description: 'Item created' })
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('logistics', 'admin')
  @ApiSecurity('jwt')
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }
     

  @Get()
  findAll() {
    return this.itemService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }


  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Item updated' })
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('logistics', 'admin')
  @ApiSecurity('jwt')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Item created' })
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('logistics', 'admin')
  @ApiSecurity('jwt')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
