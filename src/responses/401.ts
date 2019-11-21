export const responseJson401 = json => ({
  '401': {
    description: 'Unauthorized',
    examples: {
      'application/json': json,
    },
  },
});
