import * as joi from '@hapi/joi';

const responseModel = joi
  .object({
    equals: joi.number(),
  })
  .label('Partial Content retrieved');

module.exports = responseModel;
