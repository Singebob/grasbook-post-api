export const responseJson204 = json => ({
  '204': {
    description: 'No Content',
    examples: {
      'application/json': json,
    },
  },
});
