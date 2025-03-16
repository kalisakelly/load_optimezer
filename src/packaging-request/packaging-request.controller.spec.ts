import { Test, TestingModule } from '@nestjs/testing';
import { PackagingRequestController } from './packaging-request.controller';
import { PackagingRequestService } from './packaging-request.service';

describe('PackagingRequestController', () => {
  let controller: PackagingRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagingRequestController],
      providers: [PackagingRequestService],
    }).compile();

    controller = module.get<PackagingRequestController>(PackagingRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
