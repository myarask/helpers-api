const { method, path, table } = require('../../../utils/routes')(__filename);
const Joi = require('@hapi/joi');

module.exports = {
  method,
  path,
  handler: require('./handler')(table),
  options: {
    validate: {
      payload: Joi.object({
        userId: Joi.number()
          .integer()
          .positive()
          .required(),
        compensation: Joi.string()
          .valid('salary')
          .valid('piece work'),
      }),
    },
  },
};
