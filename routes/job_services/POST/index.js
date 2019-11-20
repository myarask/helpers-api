const { method, path, table } = require('../../../utils/routes')(__filename);
const Joi = require('@hapi/joi');

module.exports = {
  method,
  path,
  handler: require('./handler')(table),
  options: {
    validate: {
      payload: Joi.array().items(
        Joi.object({
          jobId: Joi.number()
            .integer()
            .required(),
          serviceId: Joi.number()
            .integer()
            .required(),
        })
      ),
    },
  },
};
