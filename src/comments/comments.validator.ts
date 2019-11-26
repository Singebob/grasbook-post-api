import * as joi from '@hapi/joi';

const CommentSchema = {
  content: joi
    .string()
    .required()
    .description('Content of the comment'),
  mediaUrl: joi
    .string()
    .required()
    .description('Url of the image/video provided'),
  userUuid: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
    .description('Uuid of the user in user api'),
};

const BasicUuidParamSchema = {
  uuid: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
    .description('Unique Identifier for one post'),
};

const BasicFindQuerySchema = {
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
};

export { BasicUuidParamSchema, CommentSchema, BasicFindQuerySchema };
