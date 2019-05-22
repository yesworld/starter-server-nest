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

- Copy and rename `.env.example` to `.env`. Setup database settings inside this file.
- If **SyncOrm is false** `TYPEORM_SYNCHRONIZE = false`, then run `yarn run sync` or `npm run sync` command for create tables in your DB.

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## TODO
* [x] JWT
* [ ] Add tests
* [ ] Add a [rule](https://github.com/marcuzy/tslint-origin-ordered-imports-rule) for Tslint
* [x] `plainToClass()` doesn't work in ValidationUserPipe. [Next release](https://github.com/typestack/class-transformer/issues/236). **Solved** by function `classToPlain()` from the `class-validate`.

## License

[MIT License](./LICENSE)

Copyright (c) @yesworld
