import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
import { Multer } from 'multer';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'The name of the vehicle',
    example: 'Truck A',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A description of the vehicle',
    example: 'Large truck for transporting goods',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The image file of the vehicle',
    type: 'string',
    format: 'binary', 
  })
  image: Express.Multer.File; 

  @ApiProperty({
    description: 'The maximum capacity of the vehicle',
    example: 5000,
  })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty({
    description: 'The driver ID',
    example: 13,
  })
  @IsNotEmpty()
  @IsNumber()
  driver: number;
}