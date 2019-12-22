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
          .positive()
          .required(),
        clientId: Joi.number()
          .integer()
          .positive()
          .required(),
        notes: Joi.string().allow(''),
        status: Joi.string().default('draft'),
      }),
    },
    auth: 'jwt-requester',
  },
};
