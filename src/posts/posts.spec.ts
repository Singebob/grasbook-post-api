import { PostSchema } from './posts.validator';
import * as json from './postPosted.json';

describe('posts.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(PostSchema.validate(json).error).toBe(null);
    });

    it('Uuid fail: null value', () => {
      const falsejson = { ...json, uuid: undefined };
      expect(PostSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Uuid fail: not a UUID value', () => {
      const falsejson = { ...json, uuid: 'N0taUUID' };
      expect(PostSchema.validate(falsejson).error).not.toBe(null);
    });

    it('userUuid fail: null value', () => {
      const falsejson = { ...json, userUuid: undefined };
      expect(PostSchema.validate(falsejson).error).not.toBe(null);
    });

    it('userUuid fail: not a UUID value', () => {
      const falsejson = { ...json, userUuid: 'N0taUUID' };
      expect(PostSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Content Fail: null value', () => {
      const falsejson = { ...json, content: undefined };
      expect(PostSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Content Fail: not a string value', () => {
      const falsejson = { ...json, content: false };
      expect(PostSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Content Fail: 500 < value', () => {
      const falsejson = { ...json, content: 'u'.repeat(1001) };
      expect(PostSchema.validate(falsejson).error).not.toBe(null);
    });
  });
});
