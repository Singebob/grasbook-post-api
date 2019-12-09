[![build status](https://gitlab.com/projet-gras-book/post-api/badges/master/build.svg)]() [![VERSION](https://img.shields.io/static/v1?label=version&message=1.0.0&color=blue)]()

Documentation : http://0.0.0.0:8888/documentation#/

**Project Gras-Book**

- Recreating a facebook-like app. Seperated in micro-services with a service for each part :
  - Posts API ((here))
  - Messaging API (https://gitlab.com/projet-gras-book/message-api)
  - User API (https://gitlab.com/projet-gras-book/user-api)
  - Reaction API (https://gitlab.com/projet-gras-book/api-reaction)
  - Gras-Book UI (https://gitlab.com/projet-gras-book/gras-book-ui)

###Env Example :

| **NAME**               | **DESCRIPTION**                         | **TYPE** |
| ---------------------- | --------------------------------------- | -------- |
| PORT                   | The port of your local server           | INT      |
| DB_PORT                | The port of your database server        | INT      |
| DB_HOST                | The host of your database server        | STRING   |
| DB_USER                | The admin user of your database         | STRING   |
| DB_PASSWORD            | The admin's password                    | STRING   |
| DB_NAME                | Your database's name on your server     | STRING   |
| DB_POOL_MAX            | The maximum pool of your database       | INT      |
| REQUESTED_RANGE        | The size of the requested range for 416 | INT      |
| MAX_RANGE              | Max range available for 416 response    | INT      |
| CONTENT_SIZE           | The size of the requested content       | INT      |
| SCALEWAY_ACESS_KEY     | The A.key of the SCWL O.Storage service | STRING   |
| SCALEWAY_SECRET_KEY    | The S.key of the SCWL O.Storage service | STRING   |
| SCALEWAY_ENDPOINT      | The End. of the SCWL O.Storage service  | STRING   |
| SCALEWAY_REGION        | The Rgion of the SCWL O.Storage service | STRING   |
| SCALEWAY_BUCKET_NAME   | The B.Nme of the SCWL O.Storage service | STRING   |
| KEYCLOAK_PROTOCOL      | The protocole to contact keycloak       | STRING   |
| KEYCLOAK_DOMAIN        | The domaine name or ip adresse          | STRING   |
| KEYCLOAK_REALM         | The realm of client                     | STRING   |
| KEYCLOAK_CLIENT_ID     | The client id for keycloak              | STRING   |
| KEYCLOAK_CLIENT_SECRET | The client's secret                     | STRING   |
