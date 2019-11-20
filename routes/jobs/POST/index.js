const { method, path, table } = require('../../../utils/routes')(__filename);
const Joi = require('@hapi/joi');

module.exports = {
  method,
  path,
  handler: require('./handler')(table),
  options: {
    validate: {
      payload: Joi.object({
        requesterId: Joi.number()
          .integer()
          .required(),
        clientId: Joi.number()
          .integer()
          .required(),
        notes: Joi.string(),
      }),
    },
  },
};
