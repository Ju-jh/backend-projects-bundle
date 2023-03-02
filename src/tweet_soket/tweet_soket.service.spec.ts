import { Test, TestingModule } from '@nestjs/testing';
import { TweetSoketService } from './tweet_soket.service';

describe('TweetSoketService', () => {
  let service: TweetSoketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetSoketService],
    }).compile();

    service = module.get<TweetSoketService>(TweetSoketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
