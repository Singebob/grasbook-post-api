import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
// import {Post} from "../posts/Post";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('character varying')
  public content: string;

  @Column('character varying')
  public mediaUrl: URL;

  @Column('uuid')
  public userUuid: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  // @ManyToOne(type => Post, post => Post.comments)
  // post: Post;
}
