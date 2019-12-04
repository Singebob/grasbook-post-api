import { PostRepository } from './posts.repository';
import { BasicUuidParamSchema, BasicFindQuerySchema, PostSchema } from './posts.validator';
import * as responses from '../responses';
import * as json from './post.json';
import { ServerRoute, CommonRouteProperties } from '@hapi/hapi';
import { ErrorFunctions, SuccessFunctions } from '../functions';

const resp200 = responses.response200.responseJson200(json);
const resp206 = responses.response206.responseJson206(json);

export const PostRoute: ServerRoute[] | CommonRouteProperties[] = [
  {
    // 200 206 400 403 416 500
    method: 'GET',
    path: '/posts',
    options: {
      handler: (request, h) => {
        return PostRepository.findAll(request.query)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'List of posts',
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
    path: '/users/{uuid}/posts',
    options: {
      handler: (request, h) => {
        return PostRepository.findAll(request.query, request.params.uuid)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'List of posts',
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
    path: '/posts/{uuid}',
    options: {
      handler: (request, h) => {
        return PostRepository.findById(request.params.uuid)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'Get only one post',
      tags: ['api'],
      validate: {
        params: BasicUuidParamSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...responses.response200.responseJson200,
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
    path: '/posts',
    options: {
      handler: (request, h) => {
        return PostRepository.create(request.payload)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'Post a post',
      tags: ['api'],
      validate: {
        payload: PostSchema,
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
    path: '/posts/{uuid}',
    options: {
      handler: (request, h) => {
        return PostRepository.update(request.params.uuid, request.payload)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'Update a post',
      tags: ['api'],
      validate: {
        params: BasicUuidParamSchema,
        payload: PostSchema,
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
    path: '/posts/{uuid}',
    options: {
      handler: (request, h) => {
        return PostRepository.delete(request.params.uuid)
          .then(result => SuccessFunctions.successCodeChange(h, result))
          .catch(err => ErrorFunctions.errorCodeChange(h, err));
      },
      notes: 'Delete a post',
      tags: ['api'],
      validate: {
        params: BasicUuidParamSchema,
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
        },
      },
    },
  },
];
