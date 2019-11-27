import * as TypeORM from 'typeorm';
import { Comment } from './comments.model';

export class CommentRepository {
  public static async findAll(options, param: string = null) {
    const args = { ...options };
    args.offset = args.limit * args.page;
    if (param !== null) {
      args.where = {
        postUuid: param,
      };
    }
    return await Comment.find(args).catch(err => console.log(err));
  }
  public static async findAllRelatedComment(id, options) {
    const args = { ...options };
    args.offset = args.limit * args.page;
    args.relations = ['comments'];
    return await Comment.findOne(id, args).then(result => {
      const comments = {...result.comments};
      return comments;
    })
    .catch(err => console.log(err));
  }
  public static async create(values) {
    return await Comment.create(values);
  }
  public static async update(id, values) {
    return await Comment.update(id, values).catch(err => console.log(err)); // Error404 à gérer
  }

  public static async delete(id) {
    return await Comment.delete(id).catch(err => console.log(err)); // Error404 à gérer
  }
  public static async findById(id) {
    return await Comment.findOne(id).catch(err => console.log(err)); // Error404 à gérer (possible)
  }
}
