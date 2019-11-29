import * as lodash from 'lodash';

const successCodeChange = (h, data) => {
  const dataValue = { ...data };
  if (!lodash.isUndefined(data.code)) {
    const { code } = dataValue;
    delete dataValue.code;

    return h.response(dataValue.result).code(code);
  }

  if (h.request.route.method === 'post') {
    return h.response(data).code(201);
  }

  if (
    (h.request.route.method === 'delete' && data.affected === 1) ||
    (h.request.route.method === 'put' && data.affected === 1)
  ) {
    return h.response().code(204);
  }

  return h.response(data).code(200);
};

export { successCodeChange };
