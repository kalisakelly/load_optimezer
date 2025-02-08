import { PartialType } from '@nestjs/swagger';
import { CreateStockEntryDto } from './create-stock_entry.dto';

export class UpdateStockEntryDto extends PartialType(CreateStockEntryDto) {}
