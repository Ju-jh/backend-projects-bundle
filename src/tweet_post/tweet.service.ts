import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTweetDto } from './dto/createTweet.dto';
import { BasicTweetDto } from './dto/basicTweet.dto';
import { Tweet } from './entities/tweet.entity';
import { plainToClass } from 'class-transformer';
import { EditTweetDto } from './dto/editTweet.dto';
import { DetailTweetDto } from './dto/detailTweet.dto';
import { Bookmark } from './entities/tweetBookmark.entity';
import { LikeTweetDto } from './dto/likeTweet.dto';
import { Like } from './entities/tweetLike.entity';

@Injectable()
export class TweetPostService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
    @InjectRepository(Bookmark)
    private BookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Like)
    private LikeRepository: Repository<Like>,
  ) {}

  async createTweet(
    tweetData: CreateTweetDto,
    userId: number,
  ): Promise<CreateTweetDto> {
    try {
      const data = {
        ...tweetData,
      };
      data.userId = userId;
      return await this.tweetRepository.save(data);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllTweet(): Promise<BasicTweetDto[]> {
    const isUser = await this.tweetRepository.find();
    return plainToClass(BasicTweetDto, isUser);
  }

  async getOneTweet(userId: number): Promise<DetailTweetDto[]> {
    const isUser = await this.tweetRepository.find({
      where: { userId: userId },
    });
    return plainToClass(DetailTweetDto, isUser);
  }

  async editTweet(tweetId: number, data: EditTweetDto) {
    const isUser = await this.tweetRepository.update({ id: tweetId }, data);
    return plainToClass(EditTweetDto, isUser);
  }

  async deleteTweet(tweetId: number) {
    return await this.tweetRepository.delete(tweetId);
  }

  async checkBookmark(tweetid: number, userid: number) {
    return await this.BookmarkRepository.findOne({
      where: { userId: userid, tweetId: tweetid },
    });
  }
  async addBookmark(tweetid: number, userid: number) {
    return await this.BookmarkRepository.save({
      tweetId: tweetid,
      userId: userid,
    });
  }

  async deleteBookmark(tweetid: number, userid: number) {
    const findBookmark: Bookmark = await this.BookmarkRepository.findOne({
      where: { userId: userid, tweetId: tweetid },
    });

    return await this.BookmarkRepository.remove(findBookmark);
  }

  async getBookmark(userid: number) {
    return await this.BookmarkRepository.find({
      where: { userId: userid },
    });
  }

  async checkTweetId(
    bookmarks: { id: number; userId: number; tweetId: number }[],
  ): Promise<number[]> {
    const tweetIds = bookmarks.map((bookmark) => bookmark.tweetId);
    return tweetIds;
  }

  async checkTweets(tweetIds: number[]): Promise<BasicTweetDto[]> {
    const tweets = await this.tweetRepository.find({
      where: { id: In(tweetIds) },
    });
    return plainToClass(BasicTweetDto, tweets);
  }

  async checkLike(tweetId: number, userId: number) {
    return await this.LikeRepository.findOne({
      where: { tweetId: tweetId, userId: userId },
    });
  }

  createLike = async (tweetId: number, userId: number) => {
    return await this.LikeRepository.save({
      tweetId: tweetId,
      userId: userId,
    });
  };

  deleteLike = async (tweetId: number, userId: number) => {
    const findLike = await this.LikeRepository.findOne({
      where: { tweetId: tweetId, userId: userId },
    });
    await this.LikeRepository.remove(findLike);
  };

  async countLikes(tweetId: number): Promise<number> {
    const countTweet = await this.LikeRepository.find({
      where: { tweetId: tweetId },
    });

    return countTweet.length;
  }

  async updateLikes(tweetId: number, countLikes: number) {
    const findTweet: LikeTweetDto = await this.tweetRepository.findOne({
      where: { id: tweetId },
    });
    try {
      const like = {
        ...findTweet,
      };
      like.likes = countLikes;
      return await this.tweetRepository.save(like);
    } catch (e) {
      console.log(e);
    }
  }
}
