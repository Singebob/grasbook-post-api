import { CommentRepository } from './comments.repository';
import { BasicUuidParamSchema, BasicFindQuerySchema, CommentSchema } from './comments.validator';
import { responseJson200 } from '../responses/200';
import { responseJson201 } from '../responses/201';
import { responseJson204 } from '../responses/204';
import { responseJson206 } from '../responses/206';
import { responseJson400 } from '../responses/400';
import { responseJson401 } from '../responses/401';
import { responseJson403 } from '../responses/403';
import { responseJson416 } from '../responses/416';
import { responseJson500 } from '../responses/500';
import * as json from './comment.json';
import { ServerRoute, CommonRouteProperties } from '@hapi/hapi';

const resp200 = responseJson200(json);
const resp201 = responseJson201(json);
const resp204 = responseJson204(json);
const resp206 = responseJson206(json);
const resp400 = responseJson400(json);
const resp401 = responseJson401(json);
const resp403 = responseJson403(json);
const resp416 = responseJson416(json);
const resp500 = responseJson500(json);

export const CommentRoute: ServerRoute[] | CommonRouteProperties[] = [
  // CHEH GET FUCKED KIDDO
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
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp200,
            ...resp206,
            ...resp400,
            ...resp416,
            ...resp403,
            ...resp500,
          },
        },
      },
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
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp200,
            ...resp206,
            ...resp400,
            ...resp416,
            ...resp403,
            ...resp500,
          },
        },
      },
    },
  },
  {
    // 200 206 400 403 416 500
    method: 'GET',
    path: '/comments/{uuid}/comments',
    options: {
      handler: (request, h) => {
        return CommentRepository.findAllRelatedComment(request.query, request.params.uuid);
      },
      notes: 'List of comments',
      tags: ['api'],
      validate: {
        query: BasicFindQuerySchema,
        params: BasicUuidParamSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp200,
            ...resp206,
            ...resp400,
            ...resp416,
            ...resp403,
            ...resp500,
          },
        },
      },
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
        params: BasicUuidParamSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp200,
            ...resp400,
            ...resp401,
            ...resp403,
            ...resp500,
          },
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
        payload: CommentSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp201,
            ...resp400,
            ...resp401,
            ...resp403,
            ...resp500,
          },
          payloadType: 'form',
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
        params: BasicUuidParamSchema,
        payload: CommentSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp204,
            ...resp400,
            ...resp401,
            ...resp403,
            ...resp500,
          },
          payloadType: 'form',
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/comments/{uuid}',
    options: {
      handler: (request, h) => {
        return CommentRepository.delete(request.params.uuid);
      },
      notes: 'Delete a comment',
      tags: ['api'],
      validate: {
        params: BasicUuidParamSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp204,
            ...resp400,
            ...resp401,
            ...resp403,
            ...resp500,
          },
        },
      },
    },
  },
];
