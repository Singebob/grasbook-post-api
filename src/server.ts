import { Server } from '@hapi/hapi';
import * as hapiSwagger from 'hapi-swagger';
import * as inert from '@hapi/inert';
import * as joi from '@hapi/joi';
import * as vision from '@hapi/vision';

import * as json from './post.json';

import { responseJson200 } from './responses/200';
import { responseJson201 } from './responses/201';
import { responseJson204 } from './responses/204';
import { responseJson206 } from './responses/206';
import { responseJson400 } from './responses/400';
import { responseJson401 } from './responses/401';
import { responseJson403 } from './responses/403';
import { responseJson416 } from './responses/416';
import { responseJson500 } from './responses/500';

const resp200 = responseJson200(json);
const resp201 = responseJson201(json);
const resp204 = responseJson204(json);
const resp206 = responseJson206(json);
const resp400 = responseJson400(json);
const resp401 = responseJson401(json);
const resp403 = responseJson403(json);
const resp416 = responseJson416(json);
const resp500 = responseJson500(json);

const init = async () => {
  const server: Server = new Server({
    host: '0.0.0.0',
    port: 8888,
  });

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: '1.0.0',
    },
  };

  server.route({
    // 200 206 400 403 416 500
    method: 'GET',
    path: '/posts',
    options: {
      handler: (request, h) => {
        return 'Posts';
      },
      notes: 'List of Posts with a range of date',
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp200,
            ...resp206,
            ...resp400,
            ...resp403,
            ...resp416,
            ...resp500,
          },
          payloadType: 'form',
        },
      },
      tags: ['api'],
      validate: {
        query: {
          search: joi.string().guid({ version: ['uuidv4'] }),
        },
      },
    },
  });

  server.route({
    // 200 401 403 500
    method: 'GET',
    path: '/posts/{uuid}',
    options: {
      handler: (request, h) => {
        return 'Cyka Blyat !';
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp200,
            ...resp201,
            ...resp403,
            ...resp500,
          },
          payloadType: 'form',
        },
      },
      notes: 'Only one post',
      tags: ['api'],
      validate: {
        params: {
          uuid: joi
            .string()
            .guid({ version: ['uuidv4'] })
            .required()
            .description('Unique Identifier for one post'),
        },
      },
    },
  });

  server.route({
    // 201 401 403 500
    method: 'POST',
    path: '/posts',
    options: {
      handler: (request, h) => {
        return 'Posts';
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp201,
            ...resp401,
            ...resp403,
            ...resp500,
          },
          payloadType: 'form',
        },
      },
      notes: 'Post a post',
      tags: ['api'],
    },
  });

  server.route({
    // 201 401 403 500
    method: 'PUT',
    path: '/posts/{uuid}',
    options: {
      handler: (request, h) => {
        return 'Posts';
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp201,
            ...resp401,
            ...resp403,
            ...resp500,
          },
          payloadType: 'form',
        },
      },
      notes: 'Put a post',
      tags: ['api'],
      validate: {
        params: {
          uuid: joi
            .string()
            .guid({ version: ['uuidv4'] })
            .required()
            .description('Unique Identifier for one post'),
        },
      },
    },
  });

  server.route({
    // 204 401 403 500
    method: 'DELETE',
    path: '/posts/{uuid}',
    options: {
      handler: (request, h) => {
        return 'Posts';
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            ...resp204,
            ...resp401,
            ...resp403,
            ...resp500,
          },
          payloadType: 'form',
        },
      },
      notes: 'Delete a post',
      tags: ['api'],
      validate: {
        params: {
          uuid: joi
            .string()
            .guid({ version: ['uuidv4'] })
            .required()
            .description('Unique Identifier for one post'),
        },
      },
    },
  });

  await server.register([
    inert,
    vision,
    {
      plugin: hapiSwagger,
      options: swaggerOptions,
    },
  ]);
  await server.start(), console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
