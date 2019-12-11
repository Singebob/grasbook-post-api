<h1 align="center">Welcome to post-api 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/post-api" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/post-api.svg">
  </a>
  <a href="http://api.posts.eddycheval.codes/documentation" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/Singebob/grasbook-post-api/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/Singebob/grasbook-post-api/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/Singebob/post-api" />
  </a>
</p>

> This project was created for a school project

**Project Gras-Book**

- Recreating a facebook-like app. Seperated in micro-services with a service for each part :
  - Posts API ((here))
  - Messaging API (https://gitlab.com/projet-gras-book/message-api)
  - User API (https://gitlab.com/projet-gras-book/user-api)
  - Reaction API (https://gitlab.com/projet-gras-book/api-reaction)
  - Gras-Book UI (https://github.com/SimonHuet/gras-book-front)

### 🏠 [Homepage](https://github.com/Singebob/grasbook-post-api#readme)

### ✨ [Demo](http://api.posts.eddycheval.codes/documentation)

## Install

```sh
npm install
```

## Usage

copy .env.sample to .env and fill it with the environnement informations. 

```sh
npm run dev
```
Informations for environnement variable: 

| **NAME**               | **DESCRIPTION**                         | **TYPE** |
| ---------------------- | --------------------------------------- | -------- |
| PORT                   | The port of your local server           | INT      |
| HOST                   | The host of your local server           | STRING   |
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


## Run tests

```sh
npm run test
```

## Author

👤 **Jeremy Chauvin**

* Github: [@Singebob](https://github.com/Singebob)

Others participants
* Github: [@SimonHuet](https://github.com/SimonHuet)
* Github: [@EddyCheval](https://github.com/EddyCheval)
* Github: [@YannDurand](https://github.com/Nefaden)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Singebob/grasbook-post-api/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Jeremy Chauvin](https://github.com/Singebob).<br />
This project is [ISC](https://github.com/Singebob/grasbook-post-api/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_