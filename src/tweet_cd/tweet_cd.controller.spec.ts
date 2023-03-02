import { Test, TestingModule } from '@nestjs/testing';
import { TweetCdController } from './tweet_cd.controller';

describe('TweetCdController', () => {
  let controller: TweetCdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetCdController],
    }).compile();

    controller = module.get<TweetCdController>(TweetCdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
