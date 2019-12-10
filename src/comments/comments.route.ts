import { CommentRepository } from './comments.repository';
import { BasicUuidParamSchema, BasicFindQuerySchema, CommentSchema } from './comments.validator';
import * as responses from '../responses';
import * as json from './comment.json';
import { ServerRoute, CommonRouteProperties } from '@hapi/hapi';
import { ErrorFunctions, SuccessFunctions } from '../functions';

const resp200 = responses.response200.responseJson200(json);
const resp206 = responses.response206.responseJson206(json);

export const CommentRoute: ServerRoute[] | CommonRouteProperties[] = [
  {
    // 200 206 400 403 416 500
    method: 'GET',
    path: '/comments',
    options: {
      handler: (request, h) => {
        return CommentRepository.findAll(request.query)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
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
            ...responses.response400.responseJson400,
            ...responses.response416.responseJson416,
            ...responses.response403.responseJson403,
            ...responses.response500.responseJson500,
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
        return CommentRepository.findAll(request.query, request.params.uuid)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
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
            ...responses.response400.responseJson400,
            ...responses.response416.responseJson416,
            ...responses.response403.responseJson403,
            ...responses.response500.responseJson500,
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
        return CommentRepository.findAllRelatedComment(request.params.uuid, request.query)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
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
            ...responses.response400.responseJson400,
            ...responses.response416.responseJson416,
            ...responses.response403.responseJson403,
            ...responses.response500.responseJson500,
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
        return CommentRepository.findById(request.params.uuid)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
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
            ...responses.response400.responseJson400,
            ...responses.response401.responseJson401,
            ...responses.response403.responseJson403,
            ...responses.response500.responseJson500,
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
        return CommentRepository.create(request.payload)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'Comment a post',
      tags: ['api'],
      validate: {
        payload: CommentSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.response201.responseJson201,
            ...responses.response401.responseJson401,
            ...responses.response400.responseJson400,
            ...responses.response403.responseJson403,
            ...responses.response500.responseJson500,
          },
          payloadType: 'form',
        },
      },
    },
  },
  {
    // 201 401 403 500
    method: 'POST',
    path: '/comments/{uuid}/comments',
    options: {
      handler: (request, h) => {
        return CommentRepository.createWithRelationComment(request.params.uuid, request.payload)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'Comment a post',
      tags: ['api'],
      validate: {
        params: BasicUuidParamSchema,
        payload: CommentSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.response201.responseJson201,
            ...responses.response401.responseJson401,
            ...responses.response400.responseJson400,
            ...responses.response403.responseJson403,
            ...responses.response500.responseJson500,
          },
          payloadType: 'form',
        },
      },
    },
  },
  {
    // 201 401 403 500
    method: 'POST',
    path: '/posts/{uuid}/comments',
    options: {
      handler: (request, h) => {
        return CommentRepository.createWithRelationPost(request.params.uuid, request.payload)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'Comment a post',
      tags: ['api'],
      validate: {
        params: BasicUuidParamSchema,
        payload: CommentSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.response201.responseJson201,
            ...responses.response401.responseJson401,
            ...responses.response400.responseJson400,
            ...responses.response403.responseJson403,
            ...responses.response500.responseJson500,
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
        return CommentRepository.update(request.params.uuid, request.payload)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
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
            ...responses.response204.responseJson204,
            ...responses.response401.responseJson401,
            ...responses.response400.responseJson400,
            ...responses.response403.responseJson403,
            ...responses.response500.responseJson500,
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
        return CommentRepository.delete(request.params.uuid)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'Delete a comment',
      tags: ['api'],
      validate: {
        params: BasicUuidParamSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.response204.responseJson204,
            ...responses.response400.responseJson400,
            ...responses.response401.responseJson401,
            ...responses.response403.responseJson403,
            ...responses.response500.responseJson500,
          },
        },
      },
    },
  },
];
