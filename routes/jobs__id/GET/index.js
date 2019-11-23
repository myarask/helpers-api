const { method, path } = require('../../../utils/routes')(__filename);
const Joi = require('@hapi/joi');

module.exports = {
  method,
  path,
  handler: require('./handler'),
  options: {
    validate: {
      params: {
        id: Joi.number()
          .integer()
          .positive(),
      },
    },
  },
};
