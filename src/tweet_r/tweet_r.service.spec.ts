import { Test, TestingModule } from '@nestjs/testing';
import { TweetRService } from './tweet_r.service';

describe('TweetRService', () => {
  let service: TweetRService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetRService],
    }).compile();

    service = module.get<TweetRService>(TweetRService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
