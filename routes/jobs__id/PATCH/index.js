const { method, path, table } = require('../../../utils/routes')(__filename);
const Joi = require('@hapi/joi');

module.exports = {
  method,
  path,
  handler: require('./handler')(table),
  options: {
    validate: {
      params: {
        id: Joi.number()
          .integer()
          .positive(),
      },
      payload: Joi.object({
        notes: Joi.string(),
        status: Joi.string().valid('open', 'cancelled', 'reserved', 'in_progress', 'reviewing', 'complete'),
        helperId: Joi.number()
          .integer()
          .positive(),
      }),
    },
  },
};
