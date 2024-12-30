import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateStockDto extends PartialType(CreateStockDto) {

    @IsNotEmpty()
    name:string
  
    @IsNotEmpty()
    details: string
    
    @IsNotEmpty()
    capacity: number 
    
    @IsNotEmpty()
    item: string
        
    // @IsNotEmpty()
    // managed_by: User
}
