import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  RelationCount,
} from 'typeorm';
import { Comment } from '../comments';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') // need DEFAUT uuid_generate_v4() in database
  public uuid: string;

  @Column('character varying')
  public content: string;

  @Column('character varying')
  public mediaUrl: URL;

  @Column('uuid')
  public userUuid: string;

  @CreateDateColumn() // need DEFAUT DATE.now() in database
  public createdAt: Date;

  @UpdateDateColumn() // need DEFAUT DATE.now() in database
  public updatedAt: Date;

  @OneToMany(
    type => Comment,
    comment => comment.post,
    {
      cascade: false,
    }
  )
  public comments: Comment[];

  @RelationCount((post: Post) => post.comments)
  public commentsCount: number;
}
