import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/user.service';
import { Packaging } from 'src/packaging/entities/packaging.entity';

@ApiTags('vehicles') // Group all vehicle-related endpoints under "vehicles" in Swagger
@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly userService: UsersService) {}

    @ApiOperation({ summary: 'Create a new vehicle and assign it to a driver' })
    @ApiBody({ type: CreateVehicleDto }) // Define the request body schema
    @ApiResponse({ status: 201, description: 'Vehicle created successfully.' })
    // @UseGuards(AuthenticationGuard, AuthorizationGuard)
    // @Roles('logistics', 'admin') // Ensure only admins or logistics can create vehicles
    // @ApiSecurity('jwt')
    @Post()
    async create(@Body() createVehicleDto: CreateVehicleDto) {
      // Find the driver (user) by the provided driverId
      const driver = await this.userService.findOne(createVehicleDto.driver);
      
      // If no driver is found, throw a 404 error
      if (!driver) {
        throw new NotFoundException(`Driver with ID ${createVehicleDto.driver} not found`);
      }
  
      // Pass the driver (user) to the service to create the vehicle
      return this.vehicleService.create(createVehicleDto, driver);
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

  // @ApiOperation({ summary: 'Update an existing vehicle' })
  // @ApiParam({ name: 'id', description: 'ID of the vehicle to update', type: 'number' })
  // @ApiBody({ type: UpdateVehicleDto }) // Define the request body schema
  // @ApiResponse({ status: 200, description: 'Vehicle updated successfully.' })
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
  //   return this.vehicleService.update(+id, updateVehicleDto);
  // }

  @ApiOperation({ summary: 'Delete a vehicle by ID' })
  @ApiParam({ name: 'id', description: 'ID of the vehicle to delete', type: 'number' })
  @ApiResponse({ status: 200, description: 'Vehicle deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }

  @ApiOperation({ summary: 'Get all packaging based on the driver\'s vehicle' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved packaging' })
  @ApiSecurity('jwt')
  @UseGuards(AuthenticationGuard)
  // @Roles('logistics', 'admin', 'driver') // Allow drivers to fetch their vehicle's packaging
  @Get('packaging/driver/:driverId')
  async getPackagingsByDriver(@Req() req: any): Promise<Packaging[]> {
    
    const driverId = req.user.id;
    return this.vehicleService.getPackagingsByDriver(driverId);
  }
}