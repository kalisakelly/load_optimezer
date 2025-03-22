import { IsNotEmpty, IsPositive } from "class-validator";


export class CreateProductPackageDto {

    @IsNotEmpty()
    id: string;

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
