export const responseJson403 = json => ({
  '403': {
    description: 'Forbidden',
    examples: {
      'application/json': json,
    },
  },
});
