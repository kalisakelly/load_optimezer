import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class LoadItemDto {
 

  @IsNumber()
  @IsNotEmpty()
  itemId: number; // Changed from `item: string` to `itemId: number`

  @IsNumber()
  @IsPositive()
  quantity: number;
}