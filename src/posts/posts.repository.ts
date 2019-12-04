import * as TypeORM from 'typeorm';
import { Post } from './posts.model';
import * as lodash from 'lodash';
import { ErrorFunctions, OperatorFunctions } from '../functions';

export class PostRepository {
  public static async findAll(options, param: string = null) {
    const args = { ...options };
    args.offset = args.limit * args.page;
    if (param !== null) {
      args.where = {
        userUuid: param,
      };
    }
    return await Post.find(args)
      .then(result => {
        ErrorFunctions.error416(result, args.query);
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

  public static async create(values) {
    const post: Post = await Post.create(values);
    post.mediaUrl = await OperatorFunctions.UploadBinaryToUri(values);
    return await Post.insert(post).then(postInserted => {
      return {
        location: `/posts/${postInserted.identifiers[0].uuid}`,
      };
    });
  }
  public static async update(uuid, values) {
    const post: Post = new Post();
    post.content = values.content;
    post.mediaUrl = await OperatorFunctions.UploadBinaryToUri(values);
    post.userUuid = values.userUuid;
    return await Post.update(uuid, post)
      .then(result => {
        ErrorFunctions.error404(result);
        return result;
      })
      .catch(err => {
        throw ErrorFunctions.error400(err);
      });
  }

  public static async delete(id) {
    return await Post.delete(id)
      .then(result => {
        ErrorFunctions.error404(result);
        return result;
      })
      .catch(err => {
        throw ErrorFunctions.error400(err);
      });
  }
  public static async findById(id) {
    return await Post.findOne(id)
      .then(result => {
        ErrorFunctions.error404(result);
        return result;
      })
      .catch(err => {
        throw ErrorFunctions.error400(err);
      });
  }
}
