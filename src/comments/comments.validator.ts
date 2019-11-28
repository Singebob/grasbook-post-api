import * as joi from '@hapi/joi';

const CommentSchema = joi.object({
  content: joi
    .string()
    .required()
    .description('Content of the comment'),
  mediaBlob: joi
    .binary()
    .encoding('base64')
    .description('Url of the image/video provided'),
  userUuid: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
    .description('Uuid of the user in user api'),
});

const BasicUuidParamSchema = joi.object({
  uuid: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
    .description('Unique Identifier for one post'),
});

// Solution 1 : Ajouter l'id dans l'objet pour correspondre au schéma ci-dessous
// (non-fonctionnelle & selon moi moins cohérentes)
// Solution 2 : Prendre en parametre l'id du commentaire commenté et l'intégré par la suite
// (solution actuelle)

/* const CommentWithRelationSchema = joi.object({
  content: joi
    .string()
    .required()
    .description('Content of the comment'),
  mediaBlob: joi
    .binary()
    .encoding('base64')
    .description('Url of the image/video provided'),
  userUuid: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
    .description('Uuid of the user in user api'),
  comment: joi.object(BasicUuidParamSchema),
}); */

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
