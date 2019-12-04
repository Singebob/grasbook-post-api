export const responseJson200 = json => ({
  200: {
    description: 'OK',
    examples: {
      'application/json': json,
    },
  },
});
