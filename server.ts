import { Server } from '@hapi/hapi';
import * as hapiSwagger from 'hapi-swagger';
import * as inert from '@hapi/inert';
import * as joi from '@hapi/joi';
import * as vision from '@hapi/vision';

const responses = require('./response/index.ts');

const init = async () => {
  const server: Server = new Server({
    host: 'localhost',
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
      response: {},
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
    // 201 401 403 500
    method: 'DELETE',
    path: '/posts/{uuid}',
    options: {
      handler: (request, h) => {
        return 'Posts';
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
