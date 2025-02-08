import { IsNotEmpty } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {

   @IsNotEmpty()
    name: string
    
   
}
