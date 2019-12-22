const { method, path, table } = require('../../../utils/routes')(__filename);
const Joi = require('@hapi/joi');

module.exports = {
  method,
  path,
  handler: require('./handler')(table),
  options: {
    validate: {
      payload: Joi.object({
        jobId: Joi.number()
          .integer()
          .required(),
        starRating: Joi.number()
          .integer()
          .min(1)
          .max(5)
          .allow(null),
        comment: Joi.string().allow(null),
      }),
    },
    auth: 'jwt',
  },
};
