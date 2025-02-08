import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDto {
  @ApiProperty({
    description: 'The name of the stock',
    example: 'Warehouse A',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Details about the stock',
    example: 'Main warehouse for electronics',
  })
  @IsNotEmpty()
  @IsString()
  details: string;

  @ApiProperty({
    description: 'The maximum capacity of the stock',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}