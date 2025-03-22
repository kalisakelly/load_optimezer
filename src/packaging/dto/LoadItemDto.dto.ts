import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class LoadItemDto {
 

  @IsNotEmpty()
  itemId: string; 

  @IsNumber()
  @IsPositive()
  quantity: number;
}