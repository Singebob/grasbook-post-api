import { CommentRepository } from './comments.repository';
import { BasicUuidParamSchema, BasicFindQuerySchema, CommentSchema } from './comments.validator';

export const CommentRoute = [
  {
    // 200 206 400 403 416 500
    method: 'GET',
    path: '/comments',
    options: {
      handler: (request, h) => {
        return CommentRepository.findAll(request.query).catch(err => console.log(err));
      },
      notes: 'List of comments',
      tags: ['api'],
      validate: {
        query: BasicFindQuerySchema,
      },
      response: {},
    },
  },
  {
    // 200 206 400 403 416 500
    method: 'GET',
    path: '/posts/{uuid}/comments',
    options: {
      handler: (request, h) => {
        return CommentRepository.findAll(request.query, request.params.uuid);
      },
      notes: 'List of comments',
      tags: ['api'],
      validate: {
        query: BasicFindQuerySchema,
        params: BasicUuidParamSchema,
      },
      response: {},
    },
  },
  {
    // 200 401 403 500
    method: 'GET',
    path: '/comments/{uuid}',
    options: {
      handler: (request, h) => {
        return CommentRepository.findById(request.params.uuid);
      },
      notes: 'Get only one comment',
      tags: ['api'],
      validate: {
        params: {
          BasicUuidParamSchema,
        },
      },
    },
  },
  {
    // 201 401 403 500
    method: 'POST',
    path: '/comments',
    options: {
      handler: (request, h) => {
        return CommentRepository.create(request.payload);
      },
      notes: 'Comment a post',
      tags: ['api'],
      validate: {
        payload: {
          CommentSchema,
        },
      },
    },
  },
  {
    // 201 401 403 500
    method: 'PUT',
    path: '/comments/{uuid}',
    options: {
      handler: (request, h) => {
        return CommentRepository.update(request.params.uuid, request.payload);
      },
      notes: 'Update a comment',
      tags: ['api'],
      validate: {
        params: {
          BasicUuidParamSchema,
        },
        payload: {
          CommentSchema,
        },
      },
    },
  },
  {
    // 201 401 403 500
    method: 'DELETE',
    path: '/comments/{uuid}',
    options: {
      handler: (request, h) => {
        return CommentRepository.delete(request.params.uuid);
      },
      notes: 'Delete a comment',
      tags: ['api'],
      validate: {
        params: {
          BasicUuidParamSchema,
        },
      },
    },
  },
];
