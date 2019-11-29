import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  RelationCount,
} from 'typeorm';
// import {Post} from "../posts/Post";

@Entity()
export class Comment extends BaseEntity {
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

  @ManyToOne(
    type => Comment,
    comment => comment.comments,
    {
      cascade: false,
    }
  )
  public comment: Comment;

  @OneToMany(
    type => Comment,
    comment => comment.comment,
    {
      cascade: true,
    }
  )
  public comments: Comment[];

  @RelationCount((comment: Comment) => comment.comments)
  public commentsCount: number;

  // @ManyToOne(type => Post, post => Post.comments)
  // post: Post;
}
