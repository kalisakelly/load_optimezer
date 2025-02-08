import { IsOptional, IsString, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class UpdateStockDto {
  @ApiProperty({
    description: 'The updated name of the stock',
    example: 'Warehouse B',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Updated details about the stock',
    example: 'Backup warehouse for spare parts',
    required: false,
  })
  @IsOptional()
  @IsString()
  details?: string;

  @ApiProperty({
    description: 'The updated maximum capacity of the stock',
    example: 150,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  capacity?: number;
}