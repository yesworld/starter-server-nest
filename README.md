<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Awesome starter project on Nest.js

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

It's a starter framework on [Nest](https://github.com/nestjs/nest), with **TypeScript** support.

## Description
A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>

## Installation

```bash
$ npm i
OR
$ yarn
```

- Copy and rename `.env.example` to `.env`. Setup database settings inside this file
- If **SyncOrm is false** `TYPEORM_SYNCHRONIZE = false`, then run `yarn run sync` or `npm run sync` command for create tables in your DB.

## Running the app

Copy and rename `.env.example` to `.env`. Setup database settings inside this file

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

[MIT License](./LICENSE)

Copyright (c) @yesworld
