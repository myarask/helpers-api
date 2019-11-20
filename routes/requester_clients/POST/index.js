const { method, path, table } = require('../../../utils/routes')(__filename);
const Joi = require('@hapi/joi');

module.exports = {
  method,
  path,
  handler: require('./handler')(table),
  options: {
    validate: {
      query: {
        requesterId: Joi.number().integer(),
        clientId: Joi.number().integer(),
      },
    },
  },
};