import { User } from 'src/tweet_user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @Column()
  likes: number;

  @Column()
  bookmark: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, { eager: true, createForeignKeyConstraints: false })
  user: User;
}
