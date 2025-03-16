import { IsNotEmpty, IsPositive } from "class-validator";


export class CreateProductPackageDto {

    @IsNotEmpty()
    item_name: string;

    @IsNotEmpty()
    details: string;

    @IsNotEmpty()
    @IsPositive()
    quantity: number;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    destination: string;
}
