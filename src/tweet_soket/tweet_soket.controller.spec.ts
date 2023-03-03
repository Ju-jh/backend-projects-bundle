import { Test, TestingModule } from '@nestjs/testing';
import { TweetSoketController } from './tweet_soket.controller';

describe('TweetSoketController', () => {
  let controller: TweetSoketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetSoketController],
    }).compile();

    controller = module.get<TweetSoketController>(TweetSoketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
