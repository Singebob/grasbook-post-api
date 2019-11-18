import * as joi from '@hapi/joi';

const responseModel = joi
  .object({
    equals: joi.number(),
  })
  .label('Range not statisfiable');

module.exports = responseModel;
