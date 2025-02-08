import { IsNotEmpty } from "class-validator";

export class CreateStockEntryDto {

  @IsNotEmpty()
  item: string;
  
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  stock: string;
}
