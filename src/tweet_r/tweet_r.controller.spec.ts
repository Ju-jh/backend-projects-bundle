import { Test, TestingModule } from '@nestjs/testing';
import { TweetRController } from './tweet_r.controller';

describe('TweetRController', () => {
  let controller: TweetRController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetRController],
    }).compile();

    controller = module.get<TweetRController>(TweetRController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
