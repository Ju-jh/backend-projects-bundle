import { User } from 'src/tweet_user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  tweetId: number;

  @ManyToOne(() => Tweet, (tweet) => tweet.id)
  tweet: Tweet;
}
