import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/createTweet.dto';
import { BasicTweetDto } from './dto/basicTweet.dto';
import { Tweet } from './entities/tweet.entity';
import { plainToClass } from 'class-transformer';
import { EditTweetDto } from './dto/editTweet.dto';
import { DetailTweetDto } from './dto/detailTweet.dto';

@Injectable()
export class TweetPostService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}

  async createTweet(
    tweetData: CreateTweetDto,
    id: number,
  ): Promise<CreateTweetDto> {
    try {
      const data = {
        ...tweetData,
      };
      data.userId = id;
      return await this.tweetRepository.save(data);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllTweet(id: number): Promise<BasicTweetDto[]> {
    const isUser = await this.tweetRepository.find({ where: { userId: id } });
    return plainToClass(BasicTweetDto, isUser);
  }

  async getOneTweet(options: {
    id: number;
    email: string;
  }): Promise<DetailTweetDto> {
    const isUser = await this.tweetRepository.findOne({
      where: { userId: options.id },
    });
    return plainToClass(DetailTweetDto, isUser);
  }

  async editTweet(id: number, data: EditTweetDto) {
    const isUser = await this.tweetRepository.update({ userId: id }, data);
    return plainToClass(EditTweetDto, isUser);
  }

  async deleteTweet(id: number) {
    return await this.tweetRepository.delete(id);
  }
}
