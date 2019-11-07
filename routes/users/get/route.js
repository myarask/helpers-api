const Joi = require('@hapi/joi');

module.exports = handler => ({
  method: 'GET',
  path: '/users',
  handler,
  options: {
    validate: {
      query: Joi.object({}),
    },
  },
});
