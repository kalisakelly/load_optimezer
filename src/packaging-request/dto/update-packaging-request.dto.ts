import { PartialType } from '@nestjs/swagger';
import { CreatePackagingRequestDto } from './create-packaging-request.dto';

export class UpdatePackagingRequestDto extends PartialType(CreatePackagingRequestDto) {}
