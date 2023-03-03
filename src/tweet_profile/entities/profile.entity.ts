import { User } from 'src/tweet_user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column()
  location: string;

  @Column()
  website?: string;

  @Column()
  photo: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;
}
