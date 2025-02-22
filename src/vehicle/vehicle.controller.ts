import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@ApiTags('vehicles') // Group all vehicle-related endpoints under "vehicles" in Swagger
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiBody({ type: CreateVehicleDto }) // Define the request body schema
  @ApiResponse({ status: 201, description: 'Vehicle created successfully.' })
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles('logistics', 'admin')
  @ApiSecurity('jwt')
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({ status: 200, description: 'List of all vehicles.' })
  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @ApiOperation({ summary: 'Get a single vehicle by ID' })
  @ApiParam({ name: 'id', description: 'ID of the vehicle to retrieve', type: 'number' })
  @ApiResponse({ status: 200, description: 'Details of the vehicle.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an existing vehicle' })
  @ApiParam({ name: 'id', description: 'ID of the vehicle to update', type: 'number' })
  @ApiBody({ type: UpdateVehicleDto }) // Define the request body schema
  @ApiResponse({ status: 200, description: 'Vehicle updated successfully.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @ApiOperation({ summary: 'Delete a vehicle by ID' })
  @ApiParam({ name: 'id', description: 'ID of the vehicle to delete', type: 'number' })
  @ApiResponse({ status: 200, description: 'Vehicle deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}