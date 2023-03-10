import { Test, TestingModule } from '@nestjs/testing';
import { AmuwikiController } from './amuwiki.controller';

describe('AmuwikiController', () => {
  let controller: AmuwikiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmuwikiController],
    }).compile();

    controller = module.get<AmuwikiController>(AmuwikiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
