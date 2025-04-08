import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @ApiProperty({
    description: 'The name of the vehicle',
    example: 'Truck A',
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'A description of the vehicle',
    example: 'Large truck for transporting goods',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The image file of the vehicle',
    type: 'string',
    format: 'binary',
    required: false
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
    description: 'The maximum capacity of the vehicle',
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @ApiProperty({
    description: 'The driver ID',
    example: 13,
    required: false
  })
  @IsOptional()
  @IsNumber()
  driverId?: number; // Changed from 'driver' to 'driverId' for clarity
}