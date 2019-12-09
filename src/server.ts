import { Server, RouteOptions, ServerRoute } from '@hapi/hapi';
import * as hapiSwagger from 'hapi-swagger';
import * as inert from '@hapi/inert';
import * as vision from '@hapi/vision';
import * as authKeycloak from 'hapi-auth-keycloak'

import { connection } from './connectDatabase/connectDatabase';

import { CommentRoute } from './comments';
import { PostRoute } from './posts';

const KEYCLOAK_URL = `${process.env.KEYCLOAK_PROTOCOL}://${process.env.KEYCLOAK_DOMAIN}/auth/realms/${process.env.KEYCLOAK_REALM}`;

const init = async () => {
  connection.then(resp => console.log('Connection Established !'));
  const server: Server = new Server({
    host: '0.0.0.0',
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: '1.0.0',
    },
  };

  const authPluginOptions = {};

  const authStrategyOptions = {
    realmUrl: KEYCLOAK_URL,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_CLIENT_SECRET,
    userInfo: ['name', 'email']
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
    {
      plugin: authKeycloak,
      options: authPluginOptions
    }
  ]);
  server.auth.strategy('keycloak-jwt', 'keycloak-jwt', authStrategyOptions);
  server.auth.default('keycloak-jwt');
  await server.start(), console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
