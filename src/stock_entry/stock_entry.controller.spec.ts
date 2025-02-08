import { Test, TestingModule } from '@nestjs/testing';
import { StockEntryController } from './stock_entry.controller';
import { StockEntryService } from './stock_entry.service';

describe('StockEntryController', () => {
  let controller: StockEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockEntryController],
      providers: [StockEntryService],
    }).compile();

    controller = module.get<StockEntryController>(StockEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
