import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    description: 'The maximum capacity of the vehicle',
    example: 5000,
  })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty({
    description: 'The driver is ID',
    example: 13,
  })
  @IsNotEmpty()
  @IsNumber()
  driver: number;
}