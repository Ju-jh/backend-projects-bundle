import { Tweet } from 'src/tweet_post/entities/tweet.entity';
import { User } from 'src/tweet_user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TweetComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comments: string;

  @Column()
  userId: number;

  @Column()
  tweetId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @OneToOne(() => User, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Tweet, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweet;
}
