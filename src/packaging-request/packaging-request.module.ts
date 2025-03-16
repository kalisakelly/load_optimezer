import { Module } from '@nestjs/common';
import { PackagingRequestService } from './packaging-request.service';
import { PackagingRequestController } from './packaging-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { PackagingRequest } from './entities/packaging-request.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Vehicle,PackagingRequest])],
  controllers: [PackagingRequestController],
  providers: [PackagingRequestService],
})
export class PackagingRequestModule {}
