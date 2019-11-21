export const responseJson500 = json => ({
  '500': {
    description: 'Internal Server Error',
    examples: {
      'application/json': json,
    },
  },
});
