const Joi = require('@hapi/joi');

module.exports = handler => ({
  method: 'GET',
  path: '/users',
  handler,
  options: {
    validate: {
      query: Joi.object({
        page: Joi.number()
          .integer()
          .positive()
          .default(0),
        pageSize: Joi.number()
          .integer()
          .positive()
          .default(100),
      }),
    },
  },
});
