import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  comments: string;

  @Column()
  retweets: string;

  @Column()
  likes: number;

  @ManyToOne(() => User, (user) => user.tweets)
  user: User;
}
