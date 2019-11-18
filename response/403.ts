import * as joi from '@hapi/joi';

const responseModel = joi
  .object({
    equals: joi.number(),
  })
  .label('Forbidden');

module.exports = responseModel;
