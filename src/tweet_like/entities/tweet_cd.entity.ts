import { User } from 'src/tweet_user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comments: string;

  @Column()
  retweets?: string;

  @Column()
  likes?: number;

  //user_name
  @ManyToOne(() => User, (user) => user.id)
  //userId
  @JoinColumn({ name: 'user_id' })
  user: User;
}
