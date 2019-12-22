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
          .positive(),
        city: Joi.string().required(),
        country: Joi.string()
          .required()
          .valid(['CA']),
        line1: Joi.string().required(),
        line2: Joi.string(),
        postal_code: Joi.string(),
        state: Joi.string().required(),
      }),
    },
  },
};
