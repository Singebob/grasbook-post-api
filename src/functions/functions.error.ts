import * as lodash from 'lodash';

class CustomError extends Error {
  public code: number;
  public statusCode: string;
  public error: string;
  constructor(message?: string, code?: number, error?: string, statusCode?: string) {
    super(message);
    this.code = code;
    this.error = error;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

const error404 = result => {
  if (!result || result.affected === 0) {
    const error = new CustomError('No match found');
    error.code = 404;
    error.error = 'No Match Found';
    error.statusCode = 'id.not.found';
    throw error;
  }
};

const error416 = (result, query) => {
  if (Array.isArray(result) && result.length === 0 && query.offset > 0) {
    const error = new CustomError('Range not satisfiable');
    error.code = 416;
    error.error = 'Range Not Satisfiable';
    error.statusCode = 'invalid.range';
    throw error;
  }
};

const error400 = errorContent => {
  // PG MISSING Column
  if (errorContent.code === '42703') {
    const error = new CustomError('Invalid column name');
    error.code = 400;
    error.error = 'Bad Request';
    error.statusCode = 'column.not.found';
    return error;
  }
  // PG unique_violation
  if (errorContent.code === '23505') {
    const error = new CustomError('Unique key violation');
    error.code = 400;
    error.error = 'Bad Request';
    error.statusCode = 'unique.constraint.violation';
    return error;
  }
  // PG FK RepoertViolation
  if (errorContent.code === '23503') {
    const error = new CustomError('No match found');
    error.code = 404;
    error.error = 'No Match Found';
    error.statusCode = 'id.not.found';
    return error;
  }
  return errorContent;
};

const errorCodeChange = (h, err) => {
  if (!lodash.isUndefined(err.code)) {
    const errorContent = {
      statusCode: err.statusCode,
      error: err.error,
      message: err.message,
    };
    return h.response(errorContent).code(err.code);
  }
  const error = {
    statusCode: 'internal.server.error',
    error: 'Internal Server Error',
    message: 'Something went wrong',
  };
  return h.response(error).code(500);
};

export { error404, errorCodeChange, error400, error416 };
