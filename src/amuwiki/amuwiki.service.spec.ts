import { Test, TestingModule } from '@nestjs/testing';
import { AmuwikiService } from './amuwiki.service';

describe('AmuwikiService', () => {
  let service: AmuwikiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmuwikiService],
    }).compile();

    service = module.get<AmuwikiService>(AmuwikiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
