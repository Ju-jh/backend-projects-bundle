import { Test, TestingModule } from '@nestjs/testing';
import { TweetCdService } from './tweet_cd.service';

describe('TweetCdService', () => {
  let service: TweetCdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetCdService],
    }).compile();

    service = module.get<TweetCdService>(TweetCdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
