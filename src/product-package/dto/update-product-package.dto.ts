import { PartialType } from '@nestjs/swagger';
import { CreateProductPackageDto } from './create-product-package.dto';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateProductPackageDto extends PartialType(CreateProductPackageDto) {

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
    verified: boolean;

    @IsNotEmpty()
    destination: string;
}
