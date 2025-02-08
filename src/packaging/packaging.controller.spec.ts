import { Test, TestingModule } from '@nestjs/testing';
import { PackagingController } from './packaging.controller';
import { PackagingService } from './packaging.service';

describe('PackagingController', () => {
  let controller: PackagingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagingController],
      providers: [PackagingService],
    }).compile();

    controller = module.get<PackagingController>(PackagingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
