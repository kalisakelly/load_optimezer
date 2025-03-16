import { Test, TestingModule } from '@nestjs/testing';
import { PackagingRequestService } from './packaging-request.service';

describe('PackagingRequestService', () => {
  let service: PackagingRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagingRequestService],
    }).compile();

    service = module.get<PackagingRequestService>(PackagingRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
