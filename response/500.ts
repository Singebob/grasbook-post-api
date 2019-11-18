import * as joi from '@hapi/joi';

const responseModel = joi
  .object({
    equals: joi.number(),
  })
  .label('Internal Server Error');

module.exports = responseModel;
