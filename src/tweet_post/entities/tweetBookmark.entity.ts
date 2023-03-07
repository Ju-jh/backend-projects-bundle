import { User } from 'src/tweet_user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  tweetId: number;

  @ManyToOne(() => Tweet, (tweet) => tweet.id)
  tweet: Tweet;
}
