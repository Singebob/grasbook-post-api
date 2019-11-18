import * as joi from '@hapi/joi';

const responseModel = joi
  .object({
    equals: joi.number(),
  })
  .label('No Content');

module.exports = responseModel;
