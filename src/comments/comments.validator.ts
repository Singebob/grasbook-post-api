import * as joi from '@hapi/joi';

const CommentSchema = joi.object({
  content: joi
    .string()
    .min(1)
    .max(500)
    .required()
    .description('Content of the comment'),
  mediaBlob: joi
    .string()
    .description('Url of the image/video provided'),
  mediaType: joi.valid('jpeg', 'jpg', 'png')
    .description("Picture's type"),
  userUuid: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
    .description('Uuid of the user in post api'),
});

const BasicUuidParamSchema = joi.object({
  uuid: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
    .description('Unique Identifier for one post'),
});

const BasicFindQuerySchema = joi.object({
  limit: joi
    .number()
    .integer()
    .min(1)
    .max(30)
    .positive()
    .default(1)
    .description('Number of items that will be retrieved'),
  page: joi
    .number()
    .integer()
    .min(0)
    .default(0)
    .description('The page number of the date that will be retrieved'),
});

export { BasicUuidParamSchema, CommentSchema, BasicFindQuerySchema };
