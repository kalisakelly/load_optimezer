import { IsNumber, IsPositive } from "class-validator";

export class LoadItemDto {
  @IsNumber()
  stockId: number;

  @IsNumber()
  itemId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}