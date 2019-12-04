import { CommentSchema } from './comments.validator';
import * as json from './commentPosted.json';

describe('comments.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(CommentSchema.validate(json).error).toBe(null);
    });

    it('Uuid fail: null value', () => {
      const falsejson = { ...json, uuid: undefined };
      expect(CommentSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Uuid fail: not a UUID value', () => {
      const falsejson = { ...json, uuid: 'N0taUUID' };
      expect(CommentSchema.validate(falsejson).error).not.toBe(null);
    });

    it('userUuid fail: null value', () => {
      const falsejson = { ...json, userUuid: undefined };
      expect(CommentSchema.validate(falsejson).error).not.toBe(null);
    });

    it('userUuid fail: not a UUID value', () => {
      const falsejson = { ...json, userUuid: 'N0taUUID' };
      expect(CommentSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Content Fail: null value', () => {
      const falsejson = { ...json, content: undefined };
      expect(CommentSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Content Fail: not a string value', () => {
      const falsejson = { ...json, content: false };
      expect(CommentSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Content Fail: 500 < value', () => {
      const falsejson = { ...json, content: 'u'.repeat(501) };
      expect(CommentSchema.validate(falsejson).error).not.toBe(null);
    });
  });
});
