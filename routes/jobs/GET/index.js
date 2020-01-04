const { method, path, table } = require('../../../utils/routes')(__filename);
const Joi = require('@hapi/joi');

module.exports = {
  method,
  path,
  handler: require('./handler')(table),
  options: {
    validate: {
      query: {
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
        id: Joi.number()
          .integer()
          .positive(),
        // status: Joi.string().valid('draft', 'cancelled', 'open', 'reserved'),
        statuses: Joi.string(),
        helperId: Joi.number()
          .integer()
          .positive(),
        requesterId: Joi.number()
          .integer()
          .positive(),
        lng: Joi.number()
          .min(-180)
          .max(180),
        lat: Joi.number()
          .min(-90)
          .max(90),
      },
    },
    auth: 'jwt',
  },
};
