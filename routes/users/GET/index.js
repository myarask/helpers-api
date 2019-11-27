const { method, path, table } = require('../../../utils/routes')(__filename);
const Joi = require('@hapi/joi');

module.exports = {
  method,
  path,
  handler: require('./handler')(table),
  options: {
    validate: {
      query: {
        id: Joi.number().integer(),
        offset: Joi.number()
          .integer()
          .min(0)
          .max(100)
          .default(0),
        limit: Joi.number()
          .integer()
          .min(0)
          .max(100)
          .default(100),
      },
    },
  },
};
