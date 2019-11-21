export const responseJson400 = json => ({
  '400': {
    description: 'Bad Request',
    examples: {
      'application/json': json,
    },
  },
});
