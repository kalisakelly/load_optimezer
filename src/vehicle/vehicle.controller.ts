import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, Req, UseInterceptors, UploadedFile, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Vehicle } from './entities/vehicle.entity';



@ApiTags('vehicles') // Group all vehicle-related endpoints under "vehicles" in Swagger
@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UsersService) {}

@Post()
@UseInterceptors(FileInterceptor('image'))
async create(
  @UploadedFile() image: Express.Multer.File,
  @Body('name') name: string,
  @Body('description') description: string,
  @Body('capacity') capacity: number,
  @Body('type') type: string,
  @Body('space_available') space_available: number,
  @Body('driver') driverId: string, // Receive driver ID as a string
  @Body('isinmotion') isinmotion: boolean,
) {
  // Validate driver ID
  const driverIdNumber = parseInt(driverId, 10);
  if (isNaN(driverIdNumber)) {
    throw new BadRequestException('Invalid driver ID');
  }

  // Fetch the driver object using the provided driver ID
  const driver = await this.userService.findOne(driverIdNumber);

  // Upload the image to Cloudinary
  let imageUrl = null;
  if (image) {
    const uploadResult = await this.cloudinaryService.uploadImage(image);
    imageUrl = uploadResult.secure_url;
  }

  // Create the new vehicle object
  const newVehicle = {
    name,
    description,
    image: imageUrl,
    capacity,
    space_available: space_available || capacity, // Use provided value or default to capacity
    type,
    driver,
    isinmotion: isinmotion !== undefined ? isinmotion : false, // Default to false if not provided
  };

  // Save the vehicle
  await this.vehicleService.create(newVehicle);

  return { message: 'New Vehicle saved successfully!' };
}  @ApiOperation({ summary: 'Get all vehicles' })
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
  update(@Param('id') id: string, @Body() updateVehicleDto: Partial<Vehicle>) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

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

  @Patch(':id/verify')
    @HttpCode(HttpStatus.OK)
    async Vehicleinmotion(
      @Param('id') id: number,
    ) {
      
  
      return await this.vehicleService.allowVehicle(id);
    }

  @Patch(':id/reloadVehicle')
  @HttpCode(HttpStatus.OK)
  async reloadVehicle(
      @Param('id') id: number,
    ) {
      
  
      return await this.vehicleService.reloadVehicle(id);
    }

    @Get('count/vehicles')
    async getUserCount() {
  
      const count = await this.vehicleService.getCountVehicle()
  
      return { count }
    
    }
}