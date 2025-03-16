import { Injectable } from '@nestjs/common';
import { CreatePackagingRequestDto } from './dto/create-packaging-request.dto';
import { UpdatePackagingRequestDto } from './dto/update-packaging-request.dto';

@Injectable()
export class PackagingRequestService {
  create(createPackagingRequestDto: CreatePackagingRequestDto) {
    return 'This action adds a new packagingRequest';
  }

  findAll() {
    return `This action returns all packagingRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} packagingRequest`;
  }

  update(id: number, updatePackagingRequestDto: UpdatePackagingRequestDto) {
    return `This action updates a #${id} packagingRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} packagingRequest`;
  }
}
