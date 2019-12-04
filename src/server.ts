import { Server, RouteOptions, ServerRoute } from '@hapi/hapi';
import * as hapiSwagger from 'hapi-swagger';
import * as inert from '@hapi/inert';
import * as vision from '@hapi/vision';

import { connection } from './connectDatabase/connectDatabase';

import { CommentRoute } from './comments';
import { PostRoute } from './posts';

const init = async () => {
  connection.then(resp => console.log('Connection Established !'));
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

  server.route(CommentRoute as ServerRoute[]);
  server.route(PostRoute as ServerRoute[]);

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
