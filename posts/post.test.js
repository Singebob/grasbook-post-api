const post = require('./post');

test('adds 1 + 2 to equal 3', () => {
  expect(post(1, 2)).toBe(3);
});
