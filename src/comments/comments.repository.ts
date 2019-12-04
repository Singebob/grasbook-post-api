import * as TypeORM from 'typeorm';
import { Comment } from './comments.model';
import * as lodash from 'lodash';
import { ErrorFunctions, OperatorFunctions } from '../functions';

export class CommentRepository {
  public static async findAll(options, param: string = null) {
    const args = { ...options };
    args.offset = args.limit * args.page;
    if (param !== null) {
      args.where = {
        postUuid: param,
      };
    }
    return await Comment.find(args)
      .then(result => {
        ErrorFunctions.error416(result, args);
        const orderTab = lodash.orderBy(result, ['updatedAt', 'createdAt'], ['desc', 'desc']);
        const slicedTab = orderTab.slice(args.offset, args.offset + args.limit);
        ErrorFunctions.error416(slicedTab, args);
        return {
          code: 206,
          result: slicedTab,
        };
      })
      .catch(err => {
        throw ErrorFunctions.error400(err);
      });
  }
  public static async findAllRelatedComment(id, options) {
    const args = { ...options };
    args.offset = args.limit * args.page;
    args.relations = ['comments'];
    return await Comment.findOne(id, args)
      .then(result => {
        ErrorFunctions.error404(result);
        const orderTab = lodash.orderBy(
          result.comments,
          ['updatedAt', 'createdAt'],
          ['desc', 'desc']
        );
        const slicedTab = orderTab.slice(args.offset, args.offset + args.limit);
        ErrorFunctions.error416(slicedTab, args);
        return { code: 206, result: slicedTab };
      })
      .catch(err => {
        throw ErrorFunctions.error400(err);
      });
  }
  public static async create(values) {
    const comment: Comment = await Comment.create(values);
    comment.mediaUrl = await OperatorFunctions.UploadBinaryToUri(values);
    return await Comment.insert(comment).then(commentInserted => {
      return {
        location: `/comments/${commentInserted.identifiers[0].uuid}`,
      };
    });
  }
  public static async update(uuid, values) {
    const comment: Comment = new Comment();
    comment.content = values.content;
    comment.mediaUrl = await OperatorFunctions.UploadBinaryToUri(values);
    comment.userUuid = values.userUuid;
    return await Comment.update(uuid, comment)
      .then(result => {
        ErrorFunctions.error404(result);
        return result;
      })
      .catch(err => {
        throw ErrorFunctions.error400(err);
      });
  }

  public static async createWithRelationComment(uuid, values) {
    const args = { ...values };
    args.comment = { uuid };
    return await this.create(args).catch(err => {
      throw ErrorFunctions.error400(err);
    });
  }

  public static async createWithRelationPost(uuid, values) {
    const args = { ...values };
    args.post = { uuid };
    return await this.create(args).catch(err => {
      throw ErrorFunctions.error400(err);
    });
  }

  public static async delete(id) {
    return await Comment.delete(id)
      .then(result => {
        ErrorFunctions.error404(result);
        return result;
      })
      .catch(err => {
        throw ErrorFunctions.error400(err);
      });
  }
  public static async findById(id) {
    return await Comment.findOne(id)
      .then(result => {
        ErrorFunctions.error404(result);
        return result;
      })
      .catch(err => {
        throw ErrorFunctions.error400(err);
      });
  }
}
