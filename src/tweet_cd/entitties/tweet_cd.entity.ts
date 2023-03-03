import { Entity } from 'typeorm';

@Entity
export class tweet_cd {
  id: number;
  _id: number;
  username: string;
  comments: string;
  retweets: number;
  likes: number;
}
