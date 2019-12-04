export const responseJson206 = json => ({
  206: {
    description: 'Partial Content retrieved',
    examples: {
      'application/json': json,
    },
  },
});
